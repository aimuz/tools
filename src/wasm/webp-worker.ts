/// <reference lib="webworker" />
export {}; // mark as module so worker-scope vars don't leak into sibling workers

// WebP encoder worker — owns the ~180 KB libwebp wasm (compiled from libwebp
// 1.4.0 C sources via zig cc, see zig-wasm/webp/). The wasm has no JS glue
// from wasm-pack; we talk to it via raw WebAssembly.instantiate.
//
// Why not use the Rust image crate's WebP encoder? The `image-webp` crate
// (pure Rust, lossless-only) produces outputs 2-3× larger than libwebp on
// PNG-like content with transparency. See the bug report where a 645 KB PNG
// expanded to 1.9 MB WebP — libwebp compresses the same RGBA to 566 KB.
//
// Protocol:
//   in:  { id, op: 'encode', args: { rgba, width, height, lossless, quality } }
//   out: { id, ok: true, result: Uint8Array } | { id, ok: false, error }
// The RGBA buffer is transferred into the worker; result bytes transferred back.

import webpWasmUrl from './zig/webp/webp.wasm?url';

type Exports = {
  memory: WebAssembly.Memory;
  alloc: (n: number) => number;
  dealloc: (p: number) => void;
  webp_free: (p: number) => void;
  encode_lossless_rgba: (
    rgba: number,
    w: number,
    h: number,
    outSize: number,
  ) => number;
  encode_lossy_rgba: (
    rgba: number,
    w: number,
    h: number,
    quality: number,
    outSize: number,
  ) => number;
};

let instancePromise: Promise<WebAssembly.Instance> | null = null;
const getInstance = (): Promise<WebAssembly.Instance> => {
  if (!instancePromise) {
    instancePromise = (async () => {
      const resp = await fetch(webpWasmUrl);
      const bytes = await resp.arrayBuffer();
      // Stub WASI imports. libwebp's encode path is pure in-memory — it
      // doesn't actually hit any syscalls — but the wasm was built for
      // wasm32-wasi so the imports must exist at instantiation time.
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
  lossless: boolean;
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
    const { rgba, width, height, lossless, quality } = args;

    const rgbaPtr = ex.alloc(rgba.length);
    new Uint8Array(ex.memory.buffer, rgbaPtr, rgba.length).set(rgba);
    const sizePtr = ex.alloc(4);

    const outPtr = lossless
      ? ex.encode_lossless_rgba(rgbaPtr, width, height, sizePtr)
      : ex.encode_lossy_rgba(rgbaPtr, width, height, quality, sizePtr);
    const size = new Uint32Array(ex.memory.buffer, sizePtr, 1)[0];

    // Copy bytes out of wasm memory before freeing — after `webp_free` the
    // linear memory slice is invalidated and may be reused by the next call.
    let result: Uint8Array | null = null;
    if (outPtr !== 0 && size > 0) {
      result = new Uint8Array(size);
      result.set(new Uint8Array(ex.memory.buffer, outPtr, size));
    }

    ex.webp_free(outPtr);
    ex.dealloc(rgbaPtr);
    ex.dealloc(sizePtr);

    if (!result) throw new Error('libwebp encode returned 0 bytes');

    (self as unknown as Worker).postMessage({ id, ok: true, result }, [
      result.buffer,
    ]);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    (self as unknown as Worker).postMessage({ id, ok: false, error: msg });
  }
});
