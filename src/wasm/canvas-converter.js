// Canvas-based Image Converter
// Stable, no WASM, works in all modern browsers

export class CanvasImageConverter {
  async convertImage(inputData, outputFormat, quality = 85) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const blob = new Blob([inputData]);
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Convert to target format
        let mimeType;
        switch (outputFormat.toLowerCase()) {
          case 'jpeg':
          case 'jpg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'webp':
            mimeType = 'image/webp';
            break;
          default:
            mimeType = 'image/png';
        }
        
        // Export as data URL, then convert to Uint8Array
        const dataUrl = canvas.toDataURL(mimeType, quality / 100);
        
        // Convert base64 to Uint8Array
        const base64 = dataUrl.split(',')[1];
        const binary = atob(base64);
        const result = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          result[i] = binary.charCodeAt(i);
        }
        
        resolve(result);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }

  async getImageInfo(inputData) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const blob = new Blob([inputData]);
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({
          width: img.width,
          height: img.height,
          channels: 4, // Canvas always uses RGBA
        });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }
}

// Singleton
let converterInstance = null;

export async function getImageConverter() {
  if (!converterInstance) {
    converterInstance = new CanvasImageConverter();
  }
  return converterInstance;
}
