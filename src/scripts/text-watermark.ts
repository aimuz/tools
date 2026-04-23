import {
  bindCopyButton,
  canvasToPngBlob,
  setClipboardLabels,
} from './clipboard';
import { setZoneEmpty, setZoneFilled, wireDropzone } from './dropzone';

export interface TextWatermarkLabels {
  parseImageError: string;
  needImageFirst: string;
  copying: string;
  copied: string;
  copyFailed: string;
  canvasError: string;
  pngFailed: string;
  clipboardNotSupported: string;
}

const DEFAULT_LABELS: TextWatermarkLabels = {
  parseImageError: 'Could not parse image, try another',
  needImageFirst: 'Please upload an image first',
  copying: 'Copying...',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  canvasError: 'Failed to create canvas context',
  pngFailed: 'PNG generation failed',
  clipboardNotSupported: 'Clipboard API is not supported in this browser',
};

export interface TextWatermarkInitOptions {
  labels?: TextWatermarkLabels;
}

type Pattern = 'tile' | 'single' | 'corner';

interface Opts {
  text: string;
  fontSize: number;
  color: string; // #rrggbb
  opacity: number; // 0..1
  rotation: number; // degrees; ignored for corner
  spacing: number; // tile spacing multiplier; only used by tile pattern
  pattern: Pattern;
  fontFamily: string;
  bold: boolean;
}

function drawWatermark(
  canvas: HTMLCanvasElement,
  bitmap: ImageBitmap,
  opts: Opts,
): void {
  // Only resize when dimensions actually change — reassigning width/height
  // resets the GPU context and forces a texture re-upload (slow).
  if (canvas.width !== bitmap.width) canvas.width = bitmap.width;
  if (canvas.height !== bitmap.height) canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);

  const text = opts.text.trim();
  if (!text) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, opts.opacity));
  ctx.fillStyle = opts.color;
  const weight = opts.bold ? '700' : '500';
  ctx.font = `${weight} ${opts.fontSize}px ${opts.fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  if (opts.pattern === 'corner') {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    // Margin scales with fontSize — relative, no abs-pixel floor, so preview
    // and full-res renders stay visually identical.
    const margin = opts.fontSize * 0.5;
    ctx.fillText(text, W - margin, H - margin);
  } else if (opts.pattern === 'single') {
    ctx.translate(W / 2, H / 2);
    ctx.rotate((opts.rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } else {
    // tile: rotated diagonal grid covering the whole canvas
    const textW = ctx.measureText(text).width;
    const mult = Math.max(0.3, opts.spacing);
    const stepX = (textW + opts.fontSize * 2.5) * mult;
    const stepY = opts.fontSize * 3.2 * mult;
    const diag = Math.ceil(Math.sqrt(W * W + H * H));
    ctx.translate(W / 2, H / 2);
    ctx.rotate((opts.rotation * Math.PI) / 180);
    let row = 0;
    for (let y = -diag; y <= diag; y += stepY) {
      const offset = row++ % 2 === 0 ? 0 : stepX / 2;
      for (let x = -diag + offset; x <= diag; x += stepX) {
        ctx.fillText(text, x, y);
      }
    }
  }
  ctx.restore();
}

const FONT_STACK = `'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif`;

export function initTextWatermarkPage(
  opts: TextWatermarkInitOptions = {},
): void {
  const labels = opts.labels ?? DEFAULT_LABELS;
  setClipboardLabels({
    notSupported: labels.clipboardNotSupported,
    canvasError: labels.canvasError,
    pngFailed: labels.pngFailed,
    copying: labels.copying,
    copied: labels.copied,
    copyFailed: labels.copyFailed,
  });
  const $ = <T extends HTMLElement = HTMLElement>(id: string) =>
    document.getElementById(id) as T;

  const dropzone = $<HTMLLabelElement>('tw-dropzone');
  const fileIn = $<HTMLInputElement>('tw-file');
  const filenameEl = $('tw-filename');
  const resultCanvas = $<HTMLCanvasElement>('tw-result');
  const downloadBtn = $<HTMLButtonElement>('tw-download');
  const copyBtn = $<HTMLButtonElement>('tw-copy');
  const resultCard = $('tw-result-card');

  const textIn = $<HTMLInputElement>('tw-text');
  const sizeIn = $<HTMLInputElement>('tw-size');
  const sizeOut = $('tw-size-val');
  const colorIn = $<HTMLInputElement>('tw-color');
  const opacityIn = $<HTMLInputElement>('tw-opacity');
  const opacityOut = $('tw-opacity-val');
  const rotationIn = $<HTMLInputElement>('tw-rotation');
  const rotationOut = $('tw-rotation-val');
  const spacingIn = $<HTMLInputElement>('tw-spacing');
  const spacingOut = $('tw-spacing-val');
  const boldIn = $<HTMLInputElement>('tw-bold');
  const patternBtns =
    document.querySelectorAll<HTMLButtonElement>('.tw-pattern-btn');
  const swatchBtns = document.querySelectorAll<HTMLButtonElement>('.tw-swatch');
  const rotationRow = $('tw-rotation-row');
  const spacingRow = $('tw-spacing-row');

  const errBox = $('err');

  // Full-resolution bitmap (used for the downloaded PNG) plus a downsampled
  // preview bitmap (used for the live canvas). The preview is capped so that
  // slider-driven redraws never hit the full-megapixel path.
  const PREVIEW_MAX = 1200;
  let bitmap: ImageBitmap | null = null;
  let displayBitmap: ImageBitmap | null = null;
  let previewScale = 1; // displayBitmap.width / bitmap.width
  let originalFilename = ''; // base name without extension
  let pattern: Pattern = 'tile';
  let rafId: number | undefined;

  const showErr = (m: string) => {
    errBox.textContent = m;
    errBox.classList.remove('hidden');
  };
  const clearErr = () => errBox.classList.add('hidden');

  const getOpts = (): Opts => ({
    text: textIn.value,
    fontSize: parseInt(sizeIn.value, 10) || 40,
    color: colorIn.value || '#ff0000',
    opacity: parseFloat(opacityIn.value),
    rotation: parseFloat(rotationIn.value),
    spacing: parseFloat(spacingIn.value),
    pattern,
    fontFamily: FONT_STACK,
    bold: boldIn.checked,
  });

  const redraw = () => {
    if (!displayBitmap) return;
    const opts = getOpts();
    // Scale fontSize proportionally so the preview looks identical to the
    // full-resolution render after CSS scales it down for display.
    drawWatermark(resultCanvas, displayBitmap, {
      ...opts,
      fontSize: opts.fontSize * previewScale,
    });
  };

  // Coalesce rapid slider 'input' events into a single draw per animation
  // frame — on a 60Hz display that's at most 60 draws/sec, with the draw
  // aligned to the paint boundary.
  const scheduleRedraw = () => {
    if (rafId !== undefined) return;
    rafId = requestAnimationFrame(() => {
      rafId = undefined;
      redraw();
    });
  };

  const renderFull = (): HTMLCanvasElement => {
    const c = document.createElement('canvas');
    drawWatermark(c, bitmap!, getOpts());
    return c;
  };

  const loadFile = async (file: File) => {
    clearErr();
    try {
      // Close both bitmaps first — covers all transitions including
      // (large→small) where the old displayBitmap is a separately-allocated
      // resized copy that would otherwise leak.
      if (displayBitmap && displayBitmap !== bitmap) displayBitmap.close?.();
      bitmap?.close?.();
      displayBitmap = null;
      bitmap = await createImageBitmap(file);
      const maxDim = Math.max(bitmap.width, bitmap.height);
      if (maxDim > PREVIEW_MAX) {
        const s = PREVIEW_MAX / maxDim;
        displayBitmap = await createImageBitmap(bitmap, {
          resizeWidth: Math.round(bitmap.width * s),
          resizeHeight: Math.round(bitmap.height * s),
          resizeQuality: 'high',
        });
        previewScale = displayBitmap.width / bitmap.width;
      } else {
        displayBitmap = bitmap;
        previewScale = 1;
      }
      filenameEl.textContent = file.name;
      originalFilename = file.name.replace(/\.[^/.]+$/, '');
      setZoneFilled(dropzone);
      // Auto-size font: ~1/28 of the smaller edge keeps the watermark readable
      // across phone screenshots (small) and DSLR shots (big).
      const auto = Math.max(
        24,
        Math.round(Math.min(bitmap.width, bitmap.height) / 28),
      );
      sizeIn.value = String(Math.min(auto, parseInt(sizeIn.max, 10)));
      sizeOut.textContent = `${sizeIn.value}px`;
      resultCard.classList.remove('hidden');
      redraw();
    } catch {
      bitmap = null;
      displayBitmap = null;
      previewScale = 1;
      setZoneEmpty(dropzone);
      showErr(labels.parseImageError);
    }
  };

  wireDropzone(dropzone, fileIn, loadFile);

  textIn.addEventListener('input', scheduleRedraw);
  sizeIn.addEventListener('input', () => {
    sizeOut.textContent = `${sizeIn.value}px`;
    scheduleRedraw();
  });
  const syncSwatchHighlight = () => {
    const current = colorIn.value.toLowerCase();
    swatchBtns.forEach((b) => {
      const active = (b.dataset.color || '').toLowerCase() === current;
      b.classList.toggle('shadow-[0_0_0_2px_#171717]', active);
      b.classList.toggle('shadow-[0_0_0_1px_rgba(0,0,0,0.15)]', !active);
    });
  };
  colorIn.addEventListener('input', () => {
    syncSwatchHighlight();
    scheduleRedraw();
  });
  swatchBtns.forEach((b) => {
    b.addEventListener('click', () => {
      const hex = b.dataset.color;
      if (!hex) return;
      colorIn.value = hex;
      syncSwatchHighlight();
      scheduleRedraw();
    });
  });
  opacityIn.addEventListener('input', () => {
    opacityOut.textContent = `${Math.round(parseFloat(opacityIn.value) * 100)}%`;
    scheduleRedraw();
  });
  rotationIn.addEventListener('input', () => {
    rotationOut.textContent = `${rotationIn.value}°`;
    scheduleRedraw();
  });
  spacingIn.addEventListener('input', () => {
    spacingOut.textContent = `${parseFloat(spacingIn.value).toFixed(1)}×`;
    scheduleRedraw();
  });
  boldIn.addEventListener('change', scheduleRedraw);

  const applyPattern = (next: Pattern) => {
    pattern = next;
    patternBtns.forEach((b) => {
      const active = b.dataset.pattern === pattern;
      b.classList.toggle('bg-[#171717]', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-[#666666]', !active);
    });
    // Rotation only matters for tile/single; spacing only for tile.
    rotationRow.classList.toggle('opacity-40', pattern === 'corner');
    rotationRow.classList.toggle('pointer-events-none', pattern === 'corner');
    spacingRow.classList.toggle('opacity-40', pattern !== 'tile');
    spacingRow.classList.toggle('pointer-events-none', pattern !== 'tile');
    scheduleRedraw();
  };
  patternBtns.forEach((b) =>
    b.addEventListener('click', () =>
      applyPattern(b.dataset.pattern as Pattern),
    ),
  );

  downloadBtn.addEventListener('click', async () => {
    if (!bitmap) {
      showErr(labels.needImageFirst);
      return;
    }
    // Render at full resolution on demand — the live canvas is preview-sized,
    // so users still get a watermarked image at the source's native dimensions.
    const blob = await canvasToPngBlob(renderFull());
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const downloadName = originalFilename
      ? `${originalFilename}-watermarked.png`
      : 'watermarked.png';
    a.download = downloadName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  });

  bindCopyButton(copyBtn, () => ({
    blob: canvasToPngBlob(renderFull()),
    mime: 'image/png',
  }));

  // Initial label values
  sizeOut.textContent = `${sizeIn.value}px`;
  opacityOut.textContent = `${Math.round(parseFloat(opacityIn.value) * 100)}%`;
  rotationOut.textContent = `${rotationIn.value}°`;
  spacingOut.textContent = `${parseFloat(spacingIn.value).toFixed(1)}×`;
  syncSwatchHighlight();
  applyPattern('tile');
}
