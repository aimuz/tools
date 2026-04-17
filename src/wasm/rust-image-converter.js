// Main-thread adapter: delegates every WASM call to a dedicated Web Worker
// so the UI stays responsive during large image encodes/decodes.

let worker = null;
let nextId = 1;
const pending = new Map();

function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('./image-worker.ts', import.meta.url), { type: 'module' });
    worker.addEventListener('message', (ev) => {
      const { id, ok, result, error } = ev.data;
      const p = pending.get(id);
      if (!p) return;
      pending.delete(id);
      if (ok) p.resolve(result);
      else p.reject(new Error(error));
    });
    worker.addEventListener('error', (ev) => {
      for (const { reject } of pending.values()) reject(new Error(ev.message || 'Worker error'));
      pending.clear();
    });
  }
  return worker;
}

function call(op, args, transfer = []) {
  const w = getWorker();
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ id, op, args }, transfer);
  });
}

export class RustImageConverter {
  async convertImage(inputData, outputFormat, quality = 85) {
    return call('convertImage', [inputData, outputFormat, quality], [inputData.buffer]);
  }

  async getImageInfo(inputData) {
    return call('getImageInfo', [inputData], [inputData.buffer]);
  }

  async getDetailedImageInfo(inputData) {
    return call('getDetailedImageInfo', [inputData], [inputData.buffer]);
  }

  async resizeImage(inputData, width, height) {
    return call('resizeImage', [inputData, width, height], [inputData.buffer]);
  }

  async compressImage(inputData, options = {}) {
    const { quality = 85, maxWidth = 0, maxHeight = 0, keepAspectRatio = true } = options;
    return call(
      'compressImage',
      [inputData, { quality, maxWidth, maxHeight, keepAspectRatio }],
      [inputData.buffer],
    );
  }

  async smartCompress(inputData, targetSizeKB = null) {
    return call('smartCompress', [inputData, targetSizeKB], [inputData.buffer]);
  }
}

let converterInstance = null;

export async function getImageConverter() {
  if (!converterInstance) converterInstance = new RustImageConverter();
  return converterInstance;
}
