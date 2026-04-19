// Main-thread adapter for the watermark worker. All calls go through a
// single shared Worker instance so the wasm module only loads once.

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void }>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./watermark-worker.ts', import.meta.url), { type: 'module' });
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
      for (const { reject } of pending.values()) reject(new Error(ev.message || 'Worker error'));
      pending.clear();
    });
  }
  return worker;
}

function call<T>(op: string, args: unknown[], transfer: Transferable[] = []): Promise<T> {
  const w = getWorker();
  const id = nextId++;
  return new Promise<T>((resolve, reject) => {
    pending.set(id, { resolve: (v) => resolve(v as T), reject });
    w.postMessage({ id, op, args }, transfer);
  });
}

/**
 * Embed `text` into an RGBA buffer. `rgba` is transferred into the worker,
 * so callers must pass a fresh copy if they want to keep the original.
 */
export function embedWatermark(
  rgba: Uint8Array,
  width: number,
  height: number,
  text: string,
): Promise<Uint8Array> {
  return call<Uint8Array>('embed', [rgba, width, height, text], [rgba.buffer]);
}

/** Extract previously-embedded text from an RGBA buffer (DCT then LSB). */
export function extractWatermark(
  rgba: Uint8Array,
  width: number,
  height: number,
): Promise<string> {
  return call<string>('extract', [rgba, width, height], [rgba.buffer]);
}

/** LSB byte capacity for a given image size. Mirrors the Rust formula exactly. */
export function lsbCapacity(width: number, height: number): number {
  return Math.max(0, Math.floor((width * height * 3) / 8) - 9);
}
