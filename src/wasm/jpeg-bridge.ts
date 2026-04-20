// Main-thread adapter for the MozJPEG worker. One shared Worker per page
// so the ~360 KB wasm loads once. Canvas decodes the input (handled by
// webp-bridge's `decodeToRgba`); this module just encodes RGBA → JPEG.

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<
  number,
  { resolve: (v: unknown) => void; reject: (e: Error) => void }
>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./jpeg-worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.addEventListener('message', (ev) => {
      const { id, ok, result, error } = ev.data as {
        id: number;
        ok: boolean;
        result?: unknown;
        error?: string;
      };
      const p = pending.get(id);
      if (!p) return;
      pending.delete(id);
      if (ok) p.resolve(result);
      else p.reject(new Error(error ?? 'Worker error'));
    });
    worker.addEventListener('error', (ev) => {
      for (const { reject } of pending.values())
        reject(new Error(ev.message || 'Worker error'));
      pending.clear();
    });
  }
  return worker;
}

/**
 * Encode raw RGBA pixels as JPEG. `quality` is 1..100; MozJPEG
 * defaults on trellis quantization + progressive scan optimization.
 * The RGBA buffer is transferred to the worker, so the caller must
 * not reuse it after this call.
 */
export function encodeJpeg(
  rgba: Uint8Array,
  width: number,
  height: number,
  quality: number = 90,
): Promise<Uint8Array> {
  const w = getWorker();
  const id = nextId++;
  const args = { rgba, width, height, quality };
  return new Promise<Uint8Array>((resolve, reject) => {
    pending.set(id, { resolve: (v) => resolve(v as Uint8Array), reject });
    w.postMessage({ id, op: 'encode', args }, [rgba.buffer]);
  });
}
