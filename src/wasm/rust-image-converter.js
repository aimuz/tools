// Rust Image Converter WASM Interface
// Using dynamic import to avoid Astro's static import restrictions

let wasmModule = null;
let initialized = false;

async function loadWasm() {
  if (initialized) return wasmModule;
  
  // Dynamically import the WASM module
  const { default: init, convert_image, get_image_info, resize_image } = 
    await import('/rust-image/image_converter.js');
  
  await init('/rust-image/image_converter_bg.wasm');
  
  wasmModule = { convert_image, get_image_info, resize_image };
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

  async resizeImage(inputData, width, height) {
    const wasm = await loadWasm();
    return wasm.resize_image(inputData, width, height);
  }
}

let converterInstance = null;

export async function getImageConverter() {
  if (!converterInstance) {
    converterInstance = new RustImageConverter();
  }
  return converterInstance;
}
