// WASM Image Converter JavaScript Interface

export class ImageConverter {
  constructor() {
    this.instance = null;
    this.memory = null;
  }

  async load() {
    if (this.instance) return;

    const response = await fetch('/wasm/image-converter.wasm');
    const wasmBuffer = await response.arrayBuffer();

    const wasmModule = await WebAssembly.instantiate(wasmBuffer, {
      env: {
        memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
      },
    });

    this.instance = wasmModule.instance.exports;
    this.memory = this.instance.memory;
  }

  allocate(size) {
    return this.instance.allocate(size);
  }

  deallocate(ptr, size) {
    this.instance.deallocate(ptr, size);
  }

  getImageInfo(imageData) {
    if (!this.instance) throw new Error('WASM not loaded');

    const ptr = this.allocate(imageData.length);
    if (!ptr) throw new Error('Failed to allocate memory');

    try {
      // Copy image data to WASM memory
      const memory = new Uint8Array(this.memory.buffer);
      memory.set(imageData, ptr);

      // Allocate width/height pointers
      const widthPtr = this.allocate(4);
      const heightPtr = this.allocate(4);

      const format = this.instance.getImageInfo(ptr, imageData.length, widthPtr, heightPtr);

      // Read width and height
      const width = new DataView(this.memory.buffer).getUint32(widthPtr, true);
      const height = new DataView(this.memory.buffer).getUint32(heightPtr, true);

      this.deallocate(widthPtr, 4);
      this.deallocate(heightPtr, 4);

      const formats = ['png', 'jpeg', 'bmp', 'gif', 'tga', 'qoi'];
      return {
        width,
        height,
        format: format < 6 ? formats[format] : 'unknown',
      };
    } finally {
      this.deallocate(ptr, imageData.length);
    }
  }

  convertImage(imageData, outputFormat, quality = 85) {
    if (!this.instance) throw new Error('WASM not loaded');

    const formatCodes = { png: 0, jpeg: 1, bmp: 2, gif: 3, tga: 4, qoi: 5 };
    const formatCode = formatCodes[outputFormat];
    if (formatCode === undefined) throw new Error('Unsupported format');

    const ptr = this.allocate(imageData.length);
    if (!ptr) throw new Error('Failed to allocate memory');

    try {
      // Copy image data to WASM memory
      const memory = new Uint8Array(this.memory.buffer);
      memory.set(imageData, ptr);

      // Convert
      const success = this.instance.convertImage(ptr, imageData.length, formatCode, quality);
      if (!success) throw new Error('Conversion failed');

      // Get result
      const resultPtr = this.instance.getResultPointer();
      const resultSize = this.instance.getResultSize();

      if (!resultPtr || resultSize === 0) throw new Error('No result');

      // Copy result from WASM memory
      const result = new Uint8Array(resultSize);
      result.set(new Uint8Array(this.memory.buffer, resultPtr, resultSize));

      // Free result in WASM
      this.instance.freeResult();

      return result;
    } finally {
      this.deallocate(ptr, imageData.length);
    }
  }
}

// Singleton instance
let converterInstance = null;

export async function getImageConverter() {
  if (!converterInstance) {
    converterInstance = new ImageConverter();
    await converterInstance.load();
  }
  return converterInstance;
}
