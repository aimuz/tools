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

  ensureMemory(size) {
    // Grow memory if needed
    const currentSize = this.memory.buffer.byteLength;
    const requiredPages = Math.ceil((size + 65536 - 1) / 65536);
    const currentPages = currentSize / 65536;
    
    if (requiredPages > currentPages) {
      this.memory.grow(requiredPages - currentPages);
    }
  }

  getImageInfo(imageData) {
    if (!this.instance) throw new Error('WASM not loaded');

    // Ensure enough memory
    this.ensureMemory(imageData.length + 100);

    // Allocate space for image data + width/height pointers
    const dataPtr = 0;  // Start at beginning of memory
    const widthPtr = imageData.length + 8;  // After image data, aligned
    const heightPtr = widthPtr + 4;

    // Copy image data to WASM memory
    const memory = new Uint8Array(this.memory.buffer);
    memory.set(imageData, dataPtr);

    // Call WASM function
    const format = this.instance.getImageInfo(dataPtr, imageData.length, widthPtr, heightPtr);

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
  }

  convertImage(imageData, outputFormat, quality = 85) {
    if (!this.instance) throw new Error('WASM not loaded');

    const formatCodes = { png: 0, jpeg: 1, bmp: 2, gif: 3, tga: 4, qoi: 5 };
    const formatCode = formatCodes[outputFormat];
    if (formatCode === undefined) throw new Error('Unsupported format: ' + outputFormat);

    // Ensure enough memory for input + output (2x input size as buffer)
    this.ensureMemory(imageData.length * 2 + 100);

    // Use fixed memory layout
    const inputPtr = 0;
    
    // Copy image data to WASM memory
    const memory = new Uint8Array(this.memory.buffer);
    memory.set(imageData, inputPtr);

    // Convert
    const success = this.instance.convertImage(inputPtr, imageData.length, formatCode, quality);
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
