import { dct8, idct8 } from './dct8';
import { bindCopyButton, canvasToPngBlob } from './clipboard';
import {
  drawImageData,
  fileToImageData,
  setZoneEmpty,
  setZoneFilled,
  wireDropzone,
} from './dropzone';

// Header layout (9 bytes, little-endian where relevant):
//   0..3  magic       "WZGL" for LSB, "WZGD" for DCT
//   4     flags       reserved (0)
//   5..8  payloadLen  uint32 LE, UTF-8 byte count
// Both algorithms share this format; only the magic and carrier differ.

const MAGIC_LSB = [0x57, 0x5a, 0x47, 0x4c]; // "WZGL"
const MAGIC_DCT = [0x57, 0x5a, 0x47, 0x44]; // "WZGD"
const HEADER_LEN = 9;

// Separation between the two middle-frequency coefficients chosen to survive
// JPEG re-encoding at Q >= 75. JPEG luminance quantization at (2,3)/(3,2) is
// ~14-24 at Q=50, so a 30-unit gap leaves headroom after PNG round-trip noise.
const DCT_MARGIN = 30;
const C1_IDX = 2 * 8 + 3; // coef[2][3]
const C2_IDX = 3 * 8 + 2; // coef[3][2]

type Mode = 'embed' | 'extract';

// ---------- Header helpers ----------

function buildHeader(magic: number[], len: number): Uint8Array {
  const h = new Uint8Array(HEADER_LEN);
  h[0] = magic[0]; h[1] = magic[1]; h[2] = magic[2]; h[3] = magic[3];
  h[4] = 0;
  h[5] = len & 0xff;
  h[6] = (len >> 8) & 0xff;
  h[7] = (len >> 16) & 0xff;
  h[8] = (len >>> 24) & 0xff;
  return h;
}

function magicMatches(bytes: Uint8Array, magic: number[]): boolean {
  return bytes[0] === magic[0] && bytes[1] === magic[1]
    && bytes[2] === magic[2] && bytes[3] === magic[3];
}

function readLen(bytes: Uint8Array): number {
  return (bytes[5] | (bytes[6] << 8) | (bytes[7] << 16) | (bytes[8] << 24)) >>> 0;
}

// ---------- LSB ----------

function lsbCapacity(w: number, h: number): number {
  return Math.floor((w * h * 3) / 8) - HEADER_LEN;
}

function lsbEmbed(img: ImageData, text: string): ImageData {
  const payload = new TextEncoder().encode(text);
  const cap = lsbCapacity(img.width, img.height);
  if (payload.length > cap) {
    throw new Error(`图片容量不足，最多可嵌入 ${cap} 字节（当前文本 ${payload.length} 字节）`);
  }
  const header = buildHeader(MAGIC_LSB, payload.length);
  const total = new Uint8Array(header.length + payload.length);
  total.set(header, 0);
  total.set(payload, header.length);

  const data = new Uint8ClampedArray(img.data);
  const totalBits = total.length * 8;
  let bitIdx = 0;
  let i = 0;
  while (i < data.length && bitIdx < totalBits) {
    if (i % 4 !== 3) {
      const bit = (total[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1;
      data[i] = (data[i] & 0xfe) | bit;
      bitIdx++;
    }
    i++;
  }
  return new ImageData(data, img.width, img.height);
}

function lsbExtract(img: ImageData): string {
  const data = img.data;
  const header = new Uint8Array(HEADER_LEN);
  let bitIdx = 0;
  let i = 0;
  while (i < data.length && bitIdx < HEADER_LEN * 8) {
    if (i % 4 !== 3) {
      const bit = data[i] & 1;
      header[bitIdx >> 3] |= bit << (7 - (bitIdx & 7));
      bitIdx++;
    }
    i++;
  }
  if (!magicMatches(header, MAGIC_LSB)) throw new Error('NO_WATERMARK');
  const len = readLen(header);
  const cap = lsbCapacity(img.width, img.height);
  if (len > cap) throw new Error('NO_WATERMARK');

  const payload = new Uint8Array(len);
  let payBit = 0;
  const payBits = len * 8;
  while (i < data.length && payBit < payBits) {
    if (i % 4 !== 3) {
      const bit = data[i] & 1;
      payload[payBit >> 3] |= bit << (7 - (payBit & 7));
      payBit++;
    }
    i++;
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(payload);
}

// ---------- DCT ----------

function dctCapacity(w: number, h: number): number {
  const blocks = Math.floor(w / 8) * Math.floor(h / 8);
  return Math.floor(blocks / 8) - HEADER_LEN;
}

function rgbToY(data: Uint8ClampedArray, pixels: number): Float64Array {
  const Y = new Float64Array(pixels);
  for (let i = 0, p = 0; p < pixels; i += 4, p++) {
    Y[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return Y;
}

function loadBlock(block: Float64Array, Y: Float64Array, w: number, bx: number, by: number): void {
  for (let y = 0; y < 8; y++) {
    const src = (by * 8 + y) * w + bx * 8;
    const dst = y * 8;
    for (let x = 0; x < 8; x++) block[dst + x] = Y[src + x];
  }
}

function storeBlock(block: Float64Array, Y: Float64Array, w: number, bx: number, by: number): void {
  for (let y = 0; y < 8; y++) {
    const dst = (by * 8 + y) * w + bx * 8;
    const src = y * 8;
    for (let x = 0; x < 8; x++) Y[dst + x] = block[src + x];
  }
}

function dctEmbed(img: ImageData, text: string): ImageData {
  const payload = new TextEncoder().encode(text);
  const cap = dctCapacity(img.width, img.height);
  if (cap <= 0) {
    throw new Error('图片太小，DCT 算法至少需要 128×128 像素');
  }
  if (payload.length > cap) {
    throw new Error(`图片容量不足，最多可嵌入 ${cap} 字节（当前文本 ${payload.length} 字节）`);
  }

  const header = buildHeader(MAGIC_DCT, payload.length);
  const total = new Uint8Array(header.length + payload.length);
  total.set(header, 0);
  total.set(payload, header.length);

  const w = img.width;
  const h = img.height;
  const pixels = w * h;
  const origY = rgbToY(img.data, pixels);
  const Y = new Float64Array(origY); // working copy — DCT mutates this

  const bw = Math.floor(w / 8);
  const bh = Math.floor(h / 8);
  const totalBits = total.length * 8;
  const block = new Float64Array(64);
  const coef = new Float64Array(64);
  const spatial = new Float64Array(64);

  let bitIdx = 0;
  for (let blockIdx = 0; blockIdx < bw * bh && bitIdx < totalBits; blockIdx++, bitIdx++) {
    const by = Math.floor(blockIdx / bw);
    const bx = blockIdx % bw;
    loadBlock(block, Y, w, bx, by);
    dct8(block, coef);

    const bit = (total[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1;
    const c1 = coef[C1_IDX];
    const c2 = coef[C2_IDX];
    if (bit === 1) {
      if (c1 - c2 < DCT_MARGIN) {
        const avg = (c1 + c2) / 2;
        coef[C1_IDX] = avg + DCT_MARGIN / 2;
        coef[C2_IDX] = avg - DCT_MARGIN / 2;
      }
    } else {
      if (c2 - c1 < DCT_MARGIN) {
        const avg = (c1 + c2) / 2;
        coef[C1_IDX] = avg - DCT_MARGIN / 2;
        coef[C2_IDX] = avg + DCT_MARGIN / 2;
      }
    }

    idct8(coef, spatial);
    storeBlock(spatial, Y, w, bx, by);
  }

  // Keep original Cb/Cr by applying dY equally to R/G/B (dR=dG=dB=dY leaves
  // the chroma differences intact).
  const out = new Uint8ClampedArray(img.data);
  for (let p = 0, i = 0; p < pixels; p++, i += 4) {
    const dY = Y[p] - origY[p];
    out[i] = clamp255(img.data[i] + dY);
    out[i + 1] = clamp255(img.data[i + 1] + dY);
    out[i + 2] = clamp255(img.data[i + 2] + dY);
    out[i + 3] = img.data[i + 3];
  }
  return new ImageData(out, w, h);
}

function clamp255(v: number): number {
  v = Math.round(v);
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function dctExtract(img: ImageData): string {
  const w = img.width;
  const h = img.height;
  const Y = rgbToY(img.data, w * h);
  const bw = Math.floor(w / 8);
  const bh = Math.floor(h / 8);
  const totalBlocks = bw * bh;
  const block = new Float64Array(64);
  const coef = new Float64Array(64);

  const readBits = (count: number, startBlock: number): { bytes: Uint8Array; nextBlock: number } => {
    const bytes = new Uint8Array(Math.ceil(count / 8));
    let bi = 0;
    let blockIdx = startBlock;
    while (bi < count && blockIdx < totalBlocks) {
      const by = Math.floor(blockIdx / bw);
      const bx = blockIdx % bw;
      loadBlock(block, Y, w, bx, by);
      dct8(block, coef);
      const bit = coef[C1_IDX] > coef[C2_IDX] ? 1 : 0;
      bytes[bi >> 3] |= bit << (7 - (bi & 7));
      bi++;
      blockIdx++;
    }
    return { bytes, nextBlock: blockIdx };
  };

  const { bytes: hdr, nextBlock } = readBits(HEADER_LEN * 8, 0);
  if (!magicMatches(hdr, MAGIC_DCT)) throw new Error('NO_WATERMARK');
  const len = readLen(hdr);
  const cap = dctCapacity(w, h);
  if (len > cap || len < 0) throw new Error('NO_WATERMARK');

  const { bytes: payload } = readBits(len * 8, nextBlock);
  return new TextDecoder('utf-8', { fatal: false }).decode(payload.slice(0, len));
}

// ---------- Combined ----------

// Embed the same text with both algorithms. DCT runs first (perturbs RGB by a
// small delta to shift middle-frequency Y coefficients); LSB then flips the
// low bit of each RGB byte — a ±1 shift that is below the DCT coefficient
// margin, so DCT extraction on the final image still works. Effect: PNG
// readers find both signals; JPG re-encoding destroys LSB but DCT survives.
function embedBoth(img: ImageData, text: string): ImageData {
  const payload = new TextEncoder().encode(text);
  const lsbCap = lsbCapacity(img.width, img.height);
  if (lsbCap <= 0) {
    throw new Error('图片太小，无法嵌入水印（至少需要约 32×32 像素）');
  }
  if (payload.length > lsbCap) {
    throw new Error(`图片容量不足，最多可嵌入 ${lsbCap} 字节（当前文本 ${payload.length} 字节）`);
  }
  const dctCap = dctCapacity(img.width, img.height);
  let out = img;
  if (dctCap > 0 && payload.length <= dctCap) {
    out = dctEmbed(out, text);
  }
  out = lsbEmbed(out, text);
  return out;
}

function extractAny(img: ImageData): string {
  try {
    return dctExtract(img);
  } catch { /* try LSB next */ }
  return lsbExtract(img);
}

// ---------- UI glue ----------

function capacityText(w: number, h: number): string {
  const cap = Math.max(0, lsbCapacity(w, h));
  const approxChars = Math.floor(cap / 3); // UTF-8 汉字 ≈ 3 字节
  const fmt = (n: number) => n.toLocaleString('en-US');
  return `可嵌入 ${fmt(cap)} 字节 · 约 ${fmt(approxChars)} 个汉字`;
}

function isJpeg(file: File): boolean {
  return /jpe?g/i.test(file.type) || /\.jpe?g$/i.test(file.name);
}

export function initWatermarkPage(): void {
  const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

  // Tab panels + buttons
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('[data-panel]');

  // Embed controls
  const embedDropzone = $<HTMLLabelElement>('embed-dropzone');
  const embedFile = $<HTMLInputElement>('embed-file');
  const embedPreview = $<HTMLCanvasElement>('embed-preview');
  const embedFilename = $('embed-filename');
  const embedCapacity = $('embed-capacity');
  const embedJpgWarn = $('embed-jpg-warn');
  const embedText = $<HTMLTextAreaElement>('embed-text');
  const embedRun = $<HTMLButtonElement>('embed-run');
  const embedResult = $('embed-result');
  const embedOut = $<HTMLCanvasElement>('embed-out');
  const embedDownload = $<HTMLAnchorElement>('embed-download');
  const embedCopy = $<HTMLButtonElement>('embed-copy');

  // Extract controls
  const extractDropzone = $<HTMLLabelElement>('extract-dropzone');
  const extractFile = $<HTMLInputElement>('extract-file');
  const extractPreview = $<HTMLCanvasElement>('extract-preview');
  const extractFilename = $('extract-filename');
  const extractRun = $<HTMLButtonElement>('extract-run');
  const extractOut = $<HTMLTextAreaElement>('extract-text');
  const extractCopy = $<HTMLButtonElement>('extract-copy');

  // Status
  const errBox = $('err');

  let mode: Mode = 'embed';
  let embedImg: ImageData | null = null;
  let extractImg: ImageData | null = null;
  let embedBlobUrl: string | null = null;

  const showErr = (msg: string) => {
    errBox.textContent = msg;
    errBox.classList.remove('hidden');
  };
  const clearStatus = () => {
    errBox.classList.add('hidden');
  };

  const refreshCapacity = () => {
    if (embedImg) {
      embedCapacity.textContent = capacityText(embedImg.width, embedImg.height);
    }
  };

  const setMode = (next: Mode) => {
    mode = next;
    tabBtns.forEach(b => {
      const active = b.dataset.tab === mode;
      b.classList.toggle('text-[#171717]', active);
      b.classList.toggle('text-[#666666]', !active);
      b.classList.toggle('shadow-[inset_0_-2px_0_#171717]', active);
    });
    panels.forEach(p => {
      p.classList.toggle('hidden', p.dataset.panel !== mode);
    });
    clearStatus();
  };

  tabBtns.forEach(b => b.addEventListener('click', () => setMode(b.dataset.tab as Mode)));

  const loadInto = (
    dropzone: HTMLLabelElement,
    preview: HTMLCanvasElement,
    filenameEl: HTMLElement,
    onImg: (img: ImageData, file: File) => void,
  ) => async (file: File) => {
    clearStatus();
    try {
      const img = await fileToImageData(file);
      drawImageData(preview, img);
      filenameEl.textContent = file.name;
      setZoneFilled(dropzone);
      onImg(img, file);
    } catch {
      setZoneEmpty(dropzone);
      showErr('无法解析图片，请换一张');
    }
  };

  // --- Embed flow ---
  wireDropzone(embedDropzone, embedFile, loadInto(embedDropzone, embedPreview, embedFilename, (img, file) => {
    embedImg = img;
    refreshCapacity();
    embedJpgWarn.classList.toggle('hidden', !isJpeg(file));
  }));

  embedRun.addEventListener('click', async () => {
    clearStatus();
    if (!embedImg) { showErr('请先上传一张图片'); return; }
    const text = embedText.value;
    if (!text) { showErr('请输入要嵌入的文本'); return; }
    embedRun.disabled = true;
    try {
      const out = embedBoth(embedImg, text);
      drawImageData(embedOut, out);
      const blob = await canvasToPngBlob(embedOut);
      if (embedBlobUrl) URL.revokeObjectURL(embedBlobUrl);
      embedBlobUrl = URL.createObjectURL(blob);
      embedDownload.href = embedBlobUrl;
      embedResult.classList.remove('hidden');
    } catch (e: any) {
      showErr(e?.message || String(e));
    } finally {
      embedRun.disabled = false;
    }
  });

  bindCopyButton(embedCopy, () => ({ blob: canvasToPngBlob(embedOut), mime: 'image/png' }));

  // --- Extract flow ---
  wireDropzone(extractDropzone, extractFile, loadInto(extractDropzone, extractPreview, extractFilename, (img) => {
    extractImg = img;
  }));

  extractRun.addEventListener('click', () => {
    clearStatus();
    if (!extractImg) { showErr('请先上传一张图片'); return; }
    extractRun.disabled = true;
    try {
      extractOut.value = extractAny(extractImg);
    } catch (e: any) {
      const msg = e?.message === 'NO_WATERMARK' ? '未检测到水印' : (e?.message || String(e));
      extractOut.value = '';
      showErr(msg);
    } finally {
      extractRun.disabled = false;
    }
  });

  extractCopy.addEventListener('click', async () => {
    if (!extractOut.value) return;
    await navigator.clipboard.writeText(extractOut.value);
    const orig = extractCopy.textContent;
    extractCopy.textContent = '已复制';
    setTimeout(() => { extractCopy.textContent = orig; }, 1200);
  });

  // Initial state
  setMode('embed');
}
