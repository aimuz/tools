/// <reference lib="webworker" />
export {};

// Streaming MP3 encode worker. The main thread hands us i16 PCM for both
// channels (already converted from the browser's AudioContext float output),
// we drive the Rust encoder in ~1-second chunks, and post progress back
// between chunks. When done we post a single Uint8Array (transferable) that
// the main thread wraps into a Blob.

import mp3WasmUrl from './rust/mp3/mp3_encode_bg.wasm?url';

type Mp3Mod = typeof import('./rust/mp3/mp3_encode.js');

let modPromise: Promise<Mp3Mod> | null = null;
const getMod = (): Promise<Mp3Mod> => {
  if (!modPromise) {
    modPromise = (async () => {
      const m = await import('./rust/mp3/mp3_encode.js');
      await m.default(mp3WasmUrl);
      return m;
    })();
  }
  return modPromise;
};

interface Req {
  channels: number;
  sampleRate: number;
  kbps: number;
  left: Int16Array;
  right: Int16Array | null;
}

// 1152 samples/frame × 38 frames ≈ 1 s at 44.1 kHz. One postMessage per
// chunk gives smooth progress without flooding the main thread.
const FRAMES_PER_CHUNK = 38;
const SAMPLES_PER_FRAME = 1152;
const CHUNK_SAMPLES = FRAMES_PER_CHUNK * SAMPLES_PER_FRAME;

self.addEventListener('message', async (ev: MessageEvent<Req>) => {
  const { channels, sampleRate, kbps, left, right } = ev.data;
  try {
    const m = await getMod();
    const encoder = new m.Mp3Encoder(channels, sampleRate, kbps);
    const chunks: Uint8Array[] = [];
    let total = left.length;
    let pos = 0;

    while (pos < total) {
      const end = Math.min(pos + CHUNK_SAMPLES, total);
      const l = left.subarray(pos, end);
      const out = right
        ? encoder.encode_stereo(l, right.subarray(pos, end))
        : encoder.encode_mono(l);
      if (out.length > 0) chunks.push(out);
      pos = end;
      const pct = Math.round((pos / total) * 100);
      (self as unknown as Worker).postMessage({ type: 'progress', pct });
    }

    const tail = encoder.finish();
    if (tail.length > 0) chunks.push(tail);

    // Concatenate into a single transferable ArrayBuffer.
    const bytes = concat(chunks);
    (self as unknown as Worker).postMessage({ type: 'done', bytes }, [
      bytes.buffer,
    ]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    (self as unknown as Worker).postMessage({ type: 'error', msg });
  }
});

function concat(chunks: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  return out;
}
