// wasm-vips Image Converter
// Assumes Vips is loaded globally from script tag

let vipsInstance = null;
let isLoading = false;
let loadPromise = null;

export async function getVips() {
  if (vipsInstance) return vipsInstance;
  if (isLoading) return loadPromise;
  
  // Check if Vips global is available
  if (typeof window === 'undefined' || !window.Vips) {
    throw new Error('Vips not loaded. Make sure to include vips.js script tag.');
  }
  
  isLoading = true;
  loadPromise = window.Vips({
    locateFile: (path) => {
      if (path.endsWith('.wasm')) {
        return '/wasm-vips/vips.wasm';
      }
      return path;
    },
  }).then(instance => {
    vipsInstance = instance;
    isLoading = false;
    return instance;
  }).catch(err => {
    isLoading = false;
    throw err;
  });
  
  return loadPromise;
}

export class VipsImageConverter {
  constructor(vips) {
    this.vips = vips;
  }

  async convertImage(inputData, outputFormat, quality = 85) {
    const vips = this.vips;
    
    // Load image from buffer
    const image = vips.Image.newFromBuffer(inputData);
    
    try {
      // Configure output options
      const options = {};
      
      // Normalize format
      const format = outputFormat.toLowerCase();
      
      if (format === 'jpeg' || format === 'jpg') {
        options.Q = quality;
        const outputBuffer = image.writeToBuffer('.jpg', options);
        return new Uint8Array(outputBuffer);
      } else if (format === 'png') {
        options.compression = 6;
        const outputBuffer = image.writeToBuffer('.png', options);
        return new Uint8Array(outputBuffer);
      } else if (format === 'webp') {
        options.Q = quality;
        const outputBuffer = image.writeToBuffer('.webp', options);
        return new Uint8Array(outputBuffer);
      } else if (format === 'gif') {
        const outputBuffer = image.writeToBuffer('.gif', options);
        return new Uint8Array(outputBuffer);
      } else if (format === 'bmp') {
        const outputBuffer = image.writeToBuffer('.bmp', options);
        return new Uint8Array(outputBuffer);
      } else if (format === 'tiff' || format === 'tif') {
        const outputBuffer = image.writeToBuffer('.tiff', options);
        return new Uint8Array(outputBuffer);
      } else {
        throw new Error('Unsupported output format: ' + format);
      }
    } finally {
      // Clean up vips image
      image.delete();
    }
  }

  async getImageInfo(inputData) {
    const vips = this.vips;
    const image = vips.Image.newFromBuffer(inputData);
    
    try {
      return {
        width: image.width,
        height: image.height,
        channels: image.bands,
        format: image.format,
      };
    } finally {
      image.delete();
    }
  }
}

export async function getImageConverter() {
  const vips = await getVips();
  return new VipsImageConverter(vips);
}
