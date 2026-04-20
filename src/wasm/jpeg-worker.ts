/// <reference lib="webworker" />
export {}; // mark as module so worker-scope vars don't leak into sibling workers

// JPEG encoder worker — owns the ~360 KB MozJPEG wasm (compiled from
// MozJPEG 4.1.5 C sources via zig cc; see zig-wasm/jpeg/). No JS glue from
// wasm-pack; we talk to the wasm via raw WebAssembly.instantiate.
//
// Why MozJPEG? Trellis quantization + progressive scan optimization (both
// on by default in the wrapper) shave ~10-20% off same-quality JPEG output
// compared to the stock Rust `jpeg-encoder` crate we were using before.
//
// Protocol:
//   in:  { id, op: 'encode', args: { rgba, width, height, quality } }
//   out: { id, ok: true, result: Uint8Array } | { id, ok: false, error }

import jpegWasmUrl from './zig/jpeg/jpeg.wasm?url';

type Exports = {
  memory: WebAssembly.Memory;
  alloc: (n: number) => number;
  dealloc: (p: number) => void;
  encode_rgba: (
    rgba: number,
    w: number,
    h: number,
    quality: number,
    progressive: number,
    outSize: number,
  ) => number;
};

let instancePromise: Promise<WebAssembly.Instance> | null = null;
const getInstance = (): Promise<WebAssembly.Instance> => {
  if (!instancePromise) {
    instancePromise = (async () => {
      const resp = await fetch(jpegWasmUrl);
      const bytes = await resp.arrayBuffer();
      const wasiStub: WebAssembly.ModuleImports = new Proxy(
        {},
        { get: () => () => 0 },
      ) as unknown as WebAssembly.ModuleImports;
      const { instance } = await WebAssembly.instantiate(bytes, {
        wasi_snapshot_preview1: wasiStub,
      });
      return instance;
    })();
  }
  return instancePromise;
};

interface EncodeArgs {
  rgba: Uint8Array;
  width: number;
  height: number;
  quality: number;
}

interface Req {
  id: number;
  op: 'encode';
  args: EncodeArgs;
}

self.addEventListener('message', async (ev: MessageEvent<Req>) => {
  const { id, op, args } = ev.data;
  try {
    if (op !== 'encode') throw new Error(`unknown op: ${op}`);

    const inst = await getInstance();
    const ex = inst.exports as unknown as Exports;
    const { rgba, width, height, quality } = args;

    const rgbaPtr = ex.alloc(rgba.length);
    new Uint8Array(ex.memory.buffer, rgbaPtr, rgba.length).set(rgba);
    const sizePtr = ex.alloc(4);

    // Progressive always on — MozJPEG's scan optimizer needs it to deliver
    // the trellis-quant savings. At q>=90 the difference is small; at q<=75
    // progressive is ~5% smaller than baseline.
    const outPtr = ex.encode_rgba(rgbaPtr, width, height, quality, 1, sizePtr);
    const size = new Uint32Array(ex.memory.buffer, sizePtr, 1)[0];

    // Copy bytes out of wasm memory before freeing so the linear memory
    // slice doesn't get reused by the next call under our feet.
    let result: Uint8Array | null = null;
    if (outPtr !== 0 && size > 0) {
      result = new Uint8Array(size);
      result.set(new Uint8Array(ex.memory.buffer, outPtr, size));
    }

    ex.dealloc(outPtr);
    ex.dealloc(rgbaPtr);
    ex.dealloc(sizePtr);

    if (!result) throw new Error('MozJPEG encode returned 0 bytes');

    (self as unknown as Worker).postMessage({ id, ok: true, result }, [
      result.buffer,
    ]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    (self as unknown as Worker).postMessage({ id, ok: false, error: msg });
  }
});
