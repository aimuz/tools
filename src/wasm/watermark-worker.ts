/// <reference lib="webworker" />
export {}; // mark as module so worker-scope vars don't leak into sibling workers

// Watermark worker — owns the tiny pure-math wasm (~60-80 KB) that handles
// LSB + DCT embed/extract over raw RGBA. Decoding/encoding stays in JS via
// the Canvas API; this worker never sees compressed image bytes.
//
// Protocol:
//   in:  { id, op, args }
//   out: { id, ok: true, result } | { id, ok: false, error }

type WatermarkMod = typeof import('./rust/watermark/watermark.js');

// `?url` hands Vite a content-hashed URL for the wasm binary — see
// image-worker.ts for the rationale.
import watermarkWasmUrl from './rust/watermark/watermark_bg.wasm?url';

let modPromise: Promise<WatermarkMod> | null = null;
const getMod = (): Promise<WatermarkMod> => {
  if (!modPromise) {
    modPromise = (async () => {
      const m = await import('./rust/watermark/watermark.js');
      await m.default(watermarkWasmUrl);
      return m;
    })();
  }
  return modPromise;
};

interface Req {
  id: number;
  op: 'embed' | 'extract';
  args: unknown[];
}

self.addEventListener('message', async (ev: MessageEvent<Req>) => {
  const { id, op, args } = ev.data;
  try {
    const m = await getMod();
    let result: unknown;
    const transfer: Transferable[] = [];

    switch (op) {
      case 'embed': {
        const [rgba, w, h, text] = args as [Uint8Array, number, number, string];
        const out = m.embed_watermark(rgba, w, h, text);
        transfer.push(out.buffer);
        result = out;
        break;
      }
      case 'extract': {
        const [rgba, w, h] = args as [Uint8Array, number, number];
        result = m.extract_watermark(rgba, w, h);
        break;
      }
      default:
        throw new Error(`unknown op: ${op}`);
    }

    (self as unknown as Worker).postMessage({ id, ok: true, result }, transfer);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    (self as unknown as Worker).postMessage({ id, ok: false, error: msg });
  }
});
