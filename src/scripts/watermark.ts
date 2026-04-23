import {
  bindCopyButton,
  canvasToPngBlob,
  setClipboardLabels,
} from './clipboard';
import {
  drawImageData,
  fileToImageData,
  setZoneEmpty,
  setZoneFilled,
  wireDropzone,
} from './dropzone';
import {
  embedWatermark,
  extractWatermark,
  lsbCapacity,
} from '../wasm/watermark-bridge';

export interface WatermarkLabels {
  parseImageError: string;
  needImageFirst: string;
  needText: string;
  noWatermark: string;
  copied: string;
  capacityHintTemplate: string;
  capacityErrorTemplate: string;
  imageTooSmallDct: string;
  imageTooSmallLsb: string;
  copying: string;
  copyFailed: string;
  canvasError: string;
  pngFailed: string;
  clipboardNotSupported: string;
}

const DEFAULT_LABELS: WatermarkLabels = {
  parseImageError: 'Could not parse image, try another',
  needImageFirst: 'Please upload an image first',
  needText: 'Please enter the text to embed',
  noWatermark: 'No watermark detected',
  copied: 'Copied',
  capacityHintTemplate: 'Capacity {bytes} bytes · ~{chars} characters',
  capacityErrorTemplate:
    'Image capacity exceeded — max {cap} bytes (current text {len} bytes)',
  imageTooSmallDct: 'Image too small — DCT requires at least 128×128 px',
  imageTooSmallLsb:
    'Image too small — at least ~32×32 px required to embed a watermark',
  copying: 'Copying...',
  copyFailed: 'Copy failed',
  canvasError: 'Failed to create canvas context',
  pngFailed: 'PNG generation failed',
  clipboardNotSupported: 'Clipboard API is not supported in this browser',
};

const interpolate = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

type Mode = 'embed' | 'extract';

// Rust error codes: map back to localised messages.
function translateError(raw: string, labels: WatermarkLabels): string {
  if (raw.startsWith('CAPACITY_EXCEEDED:')) {
    const [, cap, len] = raw.split(':');
    return interpolate(labels.capacityErrorTemplate, {
      cap: Number(cap),
      len: Number(len),
    });
  }
  switch (raw) {
    case 'IMAGE_TOO_SMALL_DCT':
      return labels.imageTooSmallDct;
    case 'IMAGE_TOO_SMALL_LSB':
      return labels.imageTooSmallLsb;
    case 'NO_WATERMARK':
      return labels.noWatermark;
    default:
      return raw;
  }
}

function capacityText(
  w: number,
  h: number,
  template: string,
  locale: string,
): string {
  const cap = lsbCapacity(w, h);
  const approxChars = Math.floor(cap / 3);
  const fmt = (n: number) => n.toLocaleString(locale);
  return interpolate(template, { bytes: fmt(cap), chars: fmt(approxChars) });
}

function isJpeg(file: File): boolean {
  return /jpe?g/i.test(file.type) || /\.jpe?g$/i.test(file.name);
}

export interface WatermarkInitOptions {
  labels?: WatermarkLabels;
  locale?: string;
}

export function initWatermarkPage(opts: WatermarkInitOptions = {}): void {
  const labels = opts.labels ?? DEFAULT_LABELS;
  const locale = opts.locale ?? 'en-US';
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

  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('[data-panel]');

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

  const extractDropzone = $<HTMLLabelElement>('extract-dropzone');
  const extractFile = $<HTMLInputElement>('extract-file');
  const extractPreview = $<HTMLCanvasElement>('extract-preview');
  const extractFilename = $('extract-filename');
  const extractRun = $<HTMLButtonElement>('extract-run');
  const extractOut = $<HTMLTextAreaElement>('extract-text');
  const extractCopy = $<HTMLButtonElement>('extract-copy');

  const errBox = $('err');

  let mode: Mode = 'embed';
  let embedImg: ImageData | null = null;
  let extractImg: ImageData | null = null;
  let embedBlobUrl: string | null = null;
  let originalFilename = ''; // base name without extension

  const showErr = (msg: string) => {
    errBox.textContent = msg;
    errBox.classList.remove('hidden');
  };
  const clearStatus = () => {
    errBox.classList.add('hidden');
  };

  const refreshCapacity = () => {
    if (embedImg) {
      embedCapacity.textContent = capacityText(
        embedImg.width,
        embedImg.height,
        labels.capacityHintTemplate,
        locale,
      );
    }
  };

  const setMode = (next: Mode) => {
    mode = next;
    tabBtns.forEach((b) => {
      const active = b.dataset.tab === mode;
      b.classList.toggle('text-[#171717]', active);
      b.classList.toggle('text-[#666666]', !active);
      b.classList.toggle('shadow-[inset_0_-2px_0_#171717]', active);
    });
    panels.forEach((p) => {
      p.classList.toggle('hidden', p.dataset.panel !== mode);
    });
    clearStatus();
  };

  tabBtns.forEach((b) =>
    b.addEventListener('click', () => setMode(b.dataset.tab as Mode)),
  );

  const loadInto =
    (
      dropzone: HTMLLabelElement,
      preview: HTMLCanvasElement,
      filenameEl: HTMLElement,
      onImg: (img: ImageData, file: File) => void,
    ) =>
    async (file: File) => {
      clearStatus();
      try {
        const img = await fileToImageData(file);
        drawImageData(preview, img);
        filenameEl.textContent = file.name;
        setZoneFilled(dropzone);
        onImg(img, file);
      } catch {
        setZoneEmpty(dropzone);
        showErr(labels.parseImageError);
      }
    };

  // --- Embed flow ---
  wireDropzone(
    embedDropzone,
    embedFile,
    loadInto(embedDropzone, embedPreview, embedFilename, (img, file) => {
      embedImg = img;
      originalFilename = file.name.replace(/\.[^/.]+$/, '');
      refreshCapacity();
      embedJpgWarn.classList.toggle('hidden', !isJpeg(file));
    }),
  );

  embedRun.addEventListener('click', async () => {
    clearStatus();
    if (!embedImg) {
      showErr(labels.needImageFirst);
      return;
    }
    const text = embedText.value;
    if (!text) {
      showErr(labels.needText);
      return;
    }
    embedRun.disabled = true;
    try {
      // Transfer needs a fresh copy so embedImg (used for re-embeds) survives.
      const rgba = new Uint8Array(embedImg.data);
      const outBytes = await embedWatermark(
        rgba,
        embedImg.width,
        embedImg.height,
        text,
      );
      // Copy into a plain Uint8ClampedArray — ImageData's constructor requires
      // an ArrayBuffer-backed array, not a SharedArrayBuffer-compatible one.
      const clamped = new Uint8ClampedArray(outBytes);
      const outData = new ImageData(clamped, embedImg.width, embedImg.height);
      drawImageData(embedOut, outData);
      const blob = await canvasToPngBlob(embedOut);
      if (embedBlobUrl) URL.revokeObjectURL(embedBlobUrl);
      embedBlobUrl = URL.createObjectURL(blob);
      embedDownload.href = embedBlobUrl;
      const downloadName = originalFilename
        ? `${originalFilename}-watermark.png`
        : 'watermark.png';
      embedDownload.download = downloadName;
      embedResult.classList.remove('hidden');
    } catch (e) {
      const raw = e instanceof Error ? e.message : String(e);
      showErr(translateError(raw, labels));
    } finally {
      embedRun.disabled = false;
    }
  });

  bindCopyButton(embedCopy, () => ({
    blob: canvasToPngBlob(embedOut),
    mime: 'image/png',
  }));

  // --- Extract flow ---
  wireDropzone(
    extractDropzone,
    extractFile,
    loadInto(extractDropzone, extractPreview, extractFilename, (img) => {
      extractImg = img;
    }),
  );

  extractRun.addEventListener('click', async () => {
    clearStatus();
    if (!extractImg) {
      showErr(labels.needImageFirst);
      return;
    }
    extractRun.disabled = true;
    try {
      const rgba = new Uint8Array(extractImg.data);
      extractOut.value = await extractWatermark(
        rgba,
        extractImg.width,
        extractImg.height,
      );
    } catch (e) {
      extractOut.value = '';
      const raw = e instanceof Error ? e.message : String(e);
      showErr(translateError(raw, labels));
    } finally {
      extractRun.disabled = false;
    }
  });

  extractCopy.addEventListener('click', async () => {
    if (!extractOut.value) return;
    await navigator.clipboard.writeText(extractOut.value);
    const orig = extractCopy.textContent;
    extractCopy.textContent = labels.copied;
    setTimeout(() => {
      extractCopy.textContent = orig;
    }, 1200);
  });

  setMode('embed');
}
