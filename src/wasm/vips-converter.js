// wasm-vips Image Converter
import Vips from 'wasm-vips';

let vipsInstance = null;

export async function getVips() {
  if (vipsInstance) return vipsInstance;
  
  vipsInstance = await Vips();
  return vipsInstance;
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
      
      if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
        options.Q = quality;
      } else if (outputFormat === 'png') {
        options.compression = 6;
      }
      
      // Write to buffer
      const outputBuffer = image.writeToBuffer('.' + outputFormat, options);
      
      return new Uint8Array(outputBuffer);
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
