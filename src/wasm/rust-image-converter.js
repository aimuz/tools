// Rust Image Converter WASM Interface
// Using dynamic import to avoid Astro's static import restrictions

let wasmModule = null;
let initialized = false;

async function loadWasm() {
  if (initialized) return wasmModule;

  // Dynamically import the WASM module
  const { default: init, convert_image, get_image_info, resize_image, compress_image, CompressOptions, get_detailed_image_info } =
    await import('./rust-image/image_converter.js');

  await init('/rust-image/image_converter_bg.wasm');

  wasmModule = { convert_image, get_image_info, resize_image, compress_image, CompressOptions, get_detailed_image_info };
  initialized = true;
  return wasmModule;
}

export class RustImageConverter {
  async convertImage(inputData, outputFormat, quality = 85) {
    const wasm = await loadWasm();
    return wasm.convert_image(inputData, outputFormat, quality);
  }

  async getImageInfo(inputData) {
    const wasm = await loadWasm();
    return wasm.get_image_info(inputData);
  }

  async getDetailedImageInfo(inputData) {
    const wasm = await loadWasm();
    return wasm.get_detailed_image_info(inputData);
  }

  async resizeImage(inputData, width, height) {
    const wasm = await loadWasm();
    return wasm.resize_image(inputData, width, height);
  }

  /**
   * Compress image with smart optimization
   * @param {Uint8Array} inputData - Input image data
   * @param {Object} options - Compression options
   * @param {number} options.quality - Quality (1-100)
   * @param {number} options.maxWidth - Max width (0 for no limit)
   * @param {number} options.maxHeight - Max height (0 for no limit)
   * @param {boolean} options.keepAspectRatio - Keep aspect ratio
   * @returns {Promise<Uint8Array>} Compressed image data
   */
  async compressImage(inputData, options = {}) {
    const wasm = await loadWasm();
    const {
      quality = 85,
      maxWidth = 0,
      maxHeight = 0,
      keepAspectRatio = true
    } = options;

    const compressOptions = new wasm.CompressOptions(quality, maxWidth, maxHeight, keepAspectRatio);
    return wasm.compress_image(inputData, compressOptions);
  }

  /**
   * Smart compress - picks sweet-spot quality per format, never silently changes format.
   *
   * PNG goes through imagequant palette quantization; JPEG uses 4:2:0 + optimized Huffman;
   * WebP is pure-Rust lossless (libwebp lossy encoding isn't available in this build).
   *
   * @param {Uint8Array} inputData - Input image data
   * @param {number|null} targetSizeKB - Optional target size in KB (hint for quality)
   * @returns {Promise<{data: Uint8Array, originalSize: number, compressedSize: number, compressionRatio: number}>}
   */
  async smartCompress(inputData, targetSizeKB = null) {
    const info = await this.getImageInfo(inputData);
    const originalSize = inputData.length;
    const format = (info.format || 'unknown').toLowerCase();

    // Per-format sweet spots, matching tinyjpg-style defaults.
    let quality;
    switch (format) {
      case 'png':  quality = 80; break; // palette quantization target
      case 'jpeg':
      case 'jpg':  quality = 75; break; // tinyjpg-range re-encode
      case 'webp': quality = 80; break; // lossless re-encode in this build; size guard returns original if larger
      default:     quality = 80;
    }

    // Optional size hint: tighten quality if the user wants an aggressive target.
    if (targetSizeKB) {
      const ratio = (targetSizeKB * 1024) / originalSize;
      if (ratio < 0.1)      quality = 50;
      else if (ratio < 0.3) quality = 60;
      else if (ratio < 0.5) quality = 70;
      else if (ratio < 0.7) quality = 80;
      else                  quality = 90;
    }

    // Clamp dimensions for very large inputs; compression + bandwidth win.
    let maxWidth = 0, maxHeight = 0;
    if (info.width > 4096 || info.height > 4096) {
      maxWidth = 4096;
      maxHeight = 4096;
    }

    const compressed = await this.compressImage(inputData, {
      quality,
      maxWidth,
      maxHeight,
      keepAspectRatio: true,
    });

    const compressedSize = compressed.length;
    const ratioPct = ((originalSize - compressedSize) / originalSize) * 100;

    if (ratioPct < 0) {
      // Defensive: Rust layer already returns original when encoding grows the file,
      // but handle the edge case where resizing happened and still grew (rare).
      return {
        data: inputData,
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 0,
      };
    }

    return {
      data: compressed,
      originalSize,
      compressedSize,
      compressionRatio: parseFloat(ratioPct.toFixed(1)),
    };
  }
}

let converterInstance = null;

export async function getImageConverter() {
  if (!converterInstance) {
    converterInstance = new RustImageConverter();
  }
  return converterInstance;
}
