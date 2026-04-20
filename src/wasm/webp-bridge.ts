// Main-thread adapter for the libwebp worker. One shared Worker per page so
// the 180 KB wasm loads once. Decoding stays on the main thread via the
// browser's Canvas API — libwebp is encode-only here, and the browser
// already ships decoders for every format we accept (PNG/JPG/BMP/GIF/WebP).

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<
  number,
  { resolve: (v: unknown) => void; reject: (e: Error) => void }
>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./webp-worker.ts', import.meta.url), {
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

export interface EncodeWebpOpts {
  /** `true` = WebP lossless (default, matches PNG→WebP page promise).
   *  `false` = lossy with `quality` (1-100). */
  lossless?: boolean;
  /** Lossy quality. Ignored when `lossless` is true. Default 90. */
  quality?: number;
}

/**
 * Encode raw RGBA pixels as WebP. The RGBA buffer is transferred to the
 * worker, so the caller must not reuse it after this call.
 */
export function encodeWebp(
  rgba: Uint8Array,
  width: number,
  height: number,
  opts: EncodeWebpOpts = {},
): Promise<Uint8Array> {
  const w = getWorker();
  const id = nextId++;
  const args = {
    rgba,
    width,
    height,
    lossless: opts.lossless ?? true,
    quality: opts.quality ?? 90,
  };
  return new Promise<Uint8Array>((resolve, reject) => {
    pending.set(id, { resolve: (v) => resolve(v as Uint8Array), reject });
    w.postMessage({ id, op: 'encode', args }, [rgba.buffer]);
  });
}

/**
 * Decode an image file (PNG/JPG/BMP/GIF/WebP — anything the browser knows)
 * to raw RGBA via Canvas. Runs on the main thread because `createImageBitmap`
 * from a Blob is the fastest path and already non-blocking. `OffscreenCanvas`
 * keeps the drawing step off the 2D context of visible canvases.
 */
export async function decodeToRgba(
  bytes: Uint8Array,
): Promise<{ rgba: Uint8Array; width: number; height: number }> {
  const blob = new Blob([bytes as BlobPart]);
  const bitmap = await createImageBitmap(blob);
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2d canvas context');
    ctx.drawImage(bitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return {
      rgba: new Uint8Array(imageData.data.buffer),
      width: canvas.width,
      height: canvas.height,
    };
  } finally {
    bitmap.close();
  }
}

/**
 * Transcode any browser-decodable image to lossless PNG bytes via Canvas.
 * Used to bridge WebP inputs into the Rust image crate — we dropped the
 * `webp` feature there (saves ~140 KB of wasm) and now rely on the browser
 * to hand us a format Rust can still read.
 */
export async function transcodeToPng(bytes: Uint8Array): Promise<Uint8Array> {
  const blob = new Blob([bytes as BlobPart]);
  const bitmap = await createImageBitmap(blob);
  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2d canvas context');
    ctx.drawImage(bitmap, 0, 0);
    const pngBlob = await canvas.convertToBlob({ type: 'image/png' });
    return new Uint8Array(await pngBlob.arrayBuffer());
  } finally {
    bitmap.close();
  }
}

/**
 * Magic-byte format sniff for images. Returns a lowercase format tag or null
 * for unrecognized input. Enough to distinguish WebP (which Rust can't decode
 * anymore) from formats Rust still handles, without calling into wasm.
 */
export function sniffImageFormat(buf: Uint8Array): string | null {
  if (buf.length < 12) return null;
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return 'png';
  // JPEG SOI: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  // GIF87a / GIF89a
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38)
    return 'gif';
  // BMP: 'BM'
  if (buf[0] === 0x42 && buf[1] === 0x4d) return 'bmp';
  // WebP: 'RIFF' ???? 'WEBP'
  if (
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50
  )
    return 'webp';
  return null;
}
