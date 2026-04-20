// Thin wasm ABI over libwebp's simple encode API.
//
// libwebp's WebPEncode* functions allocate the output buffer themselves and
// hand back a pointer + size. We re-expose that contract to JS with five
// exports:
//
//   alloc(n)                  -> ptr    // for JS to stage the input RGBA
//   dealloc(ptr)                        // for JS-allocated blocks
//   webp_free(ptr)                      // for buffers libwebp returned
//   encode_lossless_rgba(rgba, w, h, *out_size)            -> ptr
//   encode_lossy_rgba(rgba, w, h, quality, *out_size)      -> ptr
//
// On failure the encoder returns 0 and *out_size stays 0.

#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

#include "webp/encode.h"

__attribute__((export_name("alloc")))
void* wg_alloc(size_t n) { return malloc(n); }

__attribute__((export_name("dealloc")))
void wg_dealloc(void* p) { free(p); }

__attribute__((export_name("webp_free")))
void wg_webp_free(void* p) { WebPFree(p); }

__attribute__((export_name("encode_lossless_rgba")))
uint8_t* wg_encode_lossless_rgba(const uint8_t* rgba, int width, int height, size_t* out_size) {
    uint8_t* out = NULL;
    size_t n = WebPEncodeLosslessRGBA(rgba, width, height, width * 4, &out);
    *out_size = n;
    return n > 0 ? out : NULL;
}

__attribute__((export_name("encode_lossy_rgba")))
uint8_t* wg_encode_lossy_rgba(const uint8_t* rgba, int width, int height, float quality, size_t* out_size) {
    uint8_t* out = NULL;
    size_t n = WebPEncodeRGBA(rgba, width, height, width * 4, quality, &out);
    *out_size = n;
    return n > 0 ? out : NULL;
}
