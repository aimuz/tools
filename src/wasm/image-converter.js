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

    // Import object with memory
    const importObject = {
      env: {
        memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
      },
    };

    const wasmModule = await WebAssembly.instantiate(wasmBuffer, importObject);

    this.instance = wasmModule.instance.exports;
    // Use exported memory or imported memory
    this.memory = this.instance.memory || importObject.env.memory;
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

      // Allocate width/height pointers (4 bytes each)
      const widthPtr = this.allocate(4);
      const heightPtr = this.allocate(4);

      if (!widthPtr || !heightPtr) throw new Error('Failed to allocate width/height pointers');

      try {
        const format = this.instance.getImageInfo(ptr, imageData.length, widthPtr, heightPtr);

        // Read width and height (little endian)
        const dataView = new DataView(this.memory.buffer);
        const width = dataView.getUint32(widthPtr, true);
        const height = dataView.getUint32(heightPtr, true);

        const formats = ['png', 'jpeg', 'bmp', 'gif', 'tga', 'qoi'];
        return {
          width,
          height,
          format: format < 6 ? formats[format] : 'unknown',
        };
      } finally {
        this.deallocate(widthPtr, 4);
        this.deallocate(heightPtr, 4);
      }
    } finally {
      this.deallocate(ptr, imageData.length);
    }
  }

  convertImage(imageData, outputFormat, quality = 85) {
    if (!this.instance) throw new Error('WASM not loaded');

    const formatCodes = { png: 0, jpeg: 1, bmp: 2, gif: 3, tga: 4, qoi: 5 };
    const formatCode = formatCodes[outputFormat];
    if (formatCode === undefined) throw new Error('Unsupported format: ' + outputFormat);

    const ptr = this.allocate(imageData.length);
    if (!ptr) throw new Error('Failed to allocate memory for input');

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

      if (!resultPtr || resultSize === 0) throw new Error('No result from conversion');

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
