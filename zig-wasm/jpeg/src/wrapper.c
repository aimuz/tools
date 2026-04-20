// Thin wasm ABI over MozJPEG's `cjpeg` encoder path. Exposes one entry
// point that takes RGBA, flattens alpha onto white (so PNG → JPG
// conversions behave predictably), and runs libjpeg with trellis
// quantization + scan optimization on by default (MozJPEG's signature
// wins over stock libjpeg-turbo).
//
// Exports:
//   alloc(n)                                  → ptr   // staging buffer
//   dealloc(ptr)                                      // for JS-allocated
//   encode_rgba(rgba, w, h, quality, progressive,
//               *out_size)                     → ptr   // malloc'd JPEG
//     caller calls `dealloc` on the returned pointer when done.

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

#include "jpeglib.h"
#include "jerror.h"

__attribute__((export_name("alloc")))
void *wg_alloc(size_t n) { return malloc(n); }

__attribute__((export_name("dealloc")))
void wg_dealloc(void *p) { free(p); }

// libjpeg's default error_exit calls exit(EXIT_FAILURE), which on wasm
// translates to `proc_exit` and tears down the whole instance. The clean
// recovery path would be setjmp/longjmp, but zig 0.16's wasi-musl headers
// hard-error on <setjmp.h> and LLVM's `-wasm-enable-sjlj` pulls in
// `__wasm_setjmp`/`__wasm_longjmp` runtime symbols wasi-libc doesn't ship.
// For our call shape (valid RGB bytes, reasonable dimensions), the
// failure modes libjpeg raises (malloc failure, parameter violation) are
// not reachable. If we ever do hit one, trap so the caller sees a clear
// WebAssembly.RuntimeError instead of silent garbage.
static void wg_error_exit(j_common_ptr cinfo) {
  (void)cinfo;
  __builtin_trap();
}

static void wg_output_message(j_common_ptr cinfo) { (void)cinfo; }

__attribute__((export_name("encode_rgba")))
uint8_t *wg_encode_rgba(const uint8_t *rgba, int width, int height, int quality,
                        int progressive, size_t *out_size) {
  *out_size = 0;
  if (width <= 0 || height <= 0) return NULL;

  size_t npix = (size_t)width * (size_t)height;
  uint8_t *rgb = (uint8_t *)malloc(npix * 3);
  if (!rgb) return NULL;
  // Alpha flatten over white — the standard convention for PNG→JPG. libjpeg
  // itself doesn't know about alpha, and dropping it onto black would turn
  // every transparent PNG into a black-edged mess.
  for (size_t i = 0; i < npix; i++) {
    uint32_t a = rgba[i * 4 + 3];
    uint32_t r = rgba[i * 4 + 0];
    uint32_t g = rgba[i * 4 + 1];
    uint32_t b = rgba[i * 4 + 2];
    rgb[i * 3 + 0] = (uint8_t)((r * a + 255 * (255 - a)) / 255);
    rgb[i * 3 + 1] = (uint8_t)((g * a + 255 * (255 - a)) / 255);
    rgb[i * 3 + 2] = (uint8_t)((b * a + 255 * (255 - a)) / 255);
  }

  struct jpeg_compress_struct cinfo;
  struct jpeg_error_mgr jerr;
  cinfo.err = jpeg_std_error(&jerr);
  jerr.error_exit = wg_error_exit;
  jerr.output_message = wg_output_message;

  uint8_t *outbuf = NULL;
  unsigned long outbuf_size = 0;

  jpeg_create_compress(&cinfo);
  jpeg_mem_dest(&cinfo, &outbuf, &outbuf_size);

  cinfo.image_width = width;
  cinfo.image_height = height;
  cinfo.input_components = 3;
  cinfo.in_color_space = JCS_RGB;

  jpeg_set_defaults(&cinfo);
  jpeg_set_quality(&cinfo, quality, TRUE);
  // MozJPEG's trellis quant + scan optimization are what actually deliver
  // the 10-20% size win over stock libjpeg-turbo. Both on by default in
  // the `cjpeg` CLI; we opt in explicitly here.
  jpeg_c_set_bool_param(&cinfo, JBOOLEAN_OPTIMIZE_SCANS, TRUE);
  jpeg_c_set_bool_param(&cinfo, JBOOLEAN_TRELLIS_QUANT, TRUE);
  jpeg_c_set_bool_param(&cinfo, JBOOLEAN_USE_SCANS_IN_TRELLIS, TRUE);
  if (progressive) jpeg_simple_progression(&cinfo);

  jpeg_start_compress(&cinfo, TRUE);
  JSAMPROW row_pointer[1];
  int row_stride = width * 3;
  while (cinfo.next_scanline < cinfo.image_height) {
    row_pointer[0] = (JSAMPROW)(rgb + cinfo.next_scanline * row_stride);
    jpeg_write_scanlines(&cinfo, row_pointer, 1);
  }
  jpeg_finish_compress(&cinfo);
  jpeg_destroy_compress(&cinfo);

  free(rgb);
  *out_size = (size_t)outbuf_size;
  return outbuf;
}
