// Main-thread adapter for the MP3 encode worker. Each call spawns a fresh
// worker — MP3 encoding is a one-shot batch job per file, not a long-lived
// service, and recycling the worker avoids keeping the wasm module warm
// when the user isn't actively encoding.

export interface EncodeMp3Options {
  channels: 1 | 2;
  sampleRate: number;
  kbps: 128 | 192 | 256 | 320;
  left: Int16Array;
  right: Int16Array | null;
  onProgress?: (pct: number) => void;
}

export function encodeMp3(opts: EncodeMp3Options): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const worker = new Worker(new URL('./mp3-worker.ts', import.meta.url), { type: 'module' });

    worker.addEventListener('message', (ev) => {
      const msg = ev.data as
        | { type: 'progress'; pct: number }
        | { type: 'done'; bytes: Uint8Array }
        | { type: 'error'; msg: string };
      if (msg.type === 'progress') {
        opts.onProgress?.(msg.pct);
      } else if (msg.type === 'done') {
        // msg.bytes.buffer comes back as ArrayBufferLike; after transfer it's
        // a real ArrayBuffer, but TS can't narrow that — cast via BlobPart.
        resolve(new Blob([msg.bytes as BlobPart], { type: 'audio/mpeg' }));
        worker.terminate();
      } else {
        reject(new Error(msg.msg));
        worker.terminate();
      }
    });

    worker.addEventListener('error', (ev) => {
      reject(new Error(ev.message || 'mp3 worker error'));
      worker.terminate();
    });

    const transfer: Transferable[] = [opts.left.buffer];
    if (opts.right) transfer.push(opts.right.buffer);

    worker.postMessage(
      {
        channels: opts.channels,
        sampleRate: opts.sampleRate,
        kbps: opts.kbps,
        left: opts.left,
        right: opts.right,
      },
      transfer,
    );
  });
}
