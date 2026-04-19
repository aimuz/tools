/// <reference lib="webworker" />
export {}; // mark as module so worker-scope vars don't leak into sibling workers

// WASM image processing worker — owns the Rust image-tools module so the main
// thread never blocks on compress/convert calls.
//
// Compress and convert share ~500 KB of image-decoder code, so splitting them
// across two wasm modules only saved ~25% per-page and cost ~500 KB for users
// who hit both tools. One merged wasm is the honest call. Audio (mp3) etc.
// stay in their own wasm because they don't share deps with image work.
//
// Protocol:
//   in:  { id, op, args }
//   out: { id, ok: true, result } | { id, ok: false, error }
// Uint8Array results are transferred back (zero-copy).

type ImageMod = typeof import('./rust/image/image_tools.js');

// `?url` hands Vite a content-hashed URL for the wasm binary, which lets the
// edge cache it with immutable headers without stranding users on old builds.
import imageWasmUrl from './rust/image/image_tools_bg.wasm?url';

let modPromise: Promise<ImageMod> | null = null;
const getMod = (): Promise<ImageMod> => {
  if (!modPromise) {
    modPromise = (async () => {
      const m = await import('./rust/image/image_tools.js');
      await m.default(imageWasmUrl);
      return m;
    })();
  }
  return modPromise;
};

type CompressOpts = {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  keepAspectRatio: boolean;
};

interface Req {
  id: number;
  op:
    | 'getImageInfo'
    | 'getDetailedImageInfo'
    | 'resizeImage'
    | 'convertImage'
    | 'compressImage'
    | 'smartCompress';
  args: unknown[];
}

function chooseSmartQuality(
  format: string,
  originalSize: number,
  targetSizeKB: number | null,
) {
  if (targetSizeKB) {
    const r = (targetSizeKB * 1024) / originalSize;
    if (r < 0.1) return 50;
    if (r < 0.3) return 60;
    if (r < 0.5) return 70;
    if (r < 0.7) return 80;
    return 90;
  }
  switch (format) {
    case 'png':
      return 80;
    case 'jpeg':
    case 'jpg':
      return 75;
    case 'webp':
      return 80;
    default:
      return 80;
  }
}

self.addEventListener('message', async (ev: MessageEvent<Req>) => {
  const { id, op, args } = ev.data;
  try {
    const m = await getMod();
    let result: unknown;
    const transfer: Transferable[] = [];

    switch (op) {
      case 'getImageInfo':
        result = m.get_image_info(args[0] as Uint8Array);
        break;

      case 'getDetailedImageInfo':
        result = m.get_detailed_image_info(args[0] as Uint8Array);
        break;

      case 'resizeImage': {
        const out = m.resize_image(
          args[0] as Uint8Array,
          args[1] as number,
          args[2] as number,
        );
        transfer.push(out.buffer);
        result = out;
        break;
      }

      case 'convertImage': {
        const out = m.convert_image(
          args[0] as Uint8Array,
          args[1] as string,
          args[2] as number,
        );
        transfer.push(out.buffer);
        result = out;
        break;
      }

      case 'compressImage': {
        const [input, opts] = args as [Uint8Array, CompressOpts];
        const co = new m.CompressOptions(
          opts.quality,
          opts.maxWidth,
          opts.maxHeight,
          opts.keepAspectRatio,
        );
        const out = m.compress_image(input, co);
        transfer.push(out.buffer);
        result = out;
        break;
      }

      case 'smartCompress': {
        const [input, targetSizeKB] = args as [Uint8Array, number | null];
        const info = m.get_image_info(input) as {
          width: number;
          height: number;
          format: string;
        };
        const originalSize = input.length;
        const format = (info.format || 'unknown').toLowerCase();
        const quality = chooseSmartQuality(format, originalSize, targetSizeKB);
        const maxW = info.width > 4096 || info.height > 4096 ? 4096 : 0;
        const maxH = maxW;
        const co = new m.CompressOptions(quality, maxW, maxH, true);
        const compressed = m.compress_image(input, co);
        const ratioPct =
          ((originalSize - compressed.length) / originalSize) * 100;
        if (ratioPct < 0) {
          // Rust layer already returns original bytes in this case; just report no gain.
          result = {
            data: compressed,
            originalSize,
            compressedSize: originalSize,
            compressionRatio: 0,
          };
        } else {
          result = {
            data: compressed,
            originalSize,
            compressedSize: compressed.length,
            compressionRatio: +ratioPct.toFixed(1),
          };
        }
        transfer.push(compressed.buffer);
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
