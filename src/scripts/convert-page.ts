// Shared behavior for /convert and /{from}-to-{to} landing pages.
// Expects element IDs: #upload-zone, #file-input, #options, #file-list, #results, #convert-btn
// When `presetTo` is omitted, the page must provide `.format-btn[data-format=...]` buttons
// for target format selection; when `presetTo` is provided, those buttons are ignored.
// Optional: `.quality-btn[data-quality=...]` for JPG quality presets, and
// `#quality-option` wrapper, and `#detected-format` span for showing the detected input format.

import { getImageConverter } from '../wasm/rust-image-converter.js';
import { bindCopyButton, setClipboardLabels } from './clipboard';
import { openCompare, setCompareLabels, thumbPairHtml } from './image-compare';

export interface ConvertLabels {
  loading: string;
  processing: string;
  startConvert: string;
  convertFailedTemplate: string;
  copyBtn: string;
  downloadBtn: string;
  copying: string;
  copied: string;
  copyFailed: string;
  autoDetect: string;
  canvasError: string;
  pngFailed: string;
  clipboardNotSupported: string;
  compareBtn: string;
  compareBefore: string;
  compareAfter: string;
}

const DEFAULT_LABELS: ConvertLabels = {
  loading: 'Loading, please try again shortly',
  processing: 'Processing...',
  startConvert: 'Start converting',
  convertFailedTemplate: 'Convert failed: {name}',
  copyBtn: 'Copy',
  downloadBtn: 'Download',
  copying: 'Copying...',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  autoDetect: 'Auto-detected',
  canvasError: 'Failed to create canvas context',
  pngFailed: 'PNG generation failed',
  clipboardNotSupported: 'Clipboard API is not supported in this browser',
  compareBtn: 'Compare',
  compareBefore: 'Before',
  compareAfter: 'After',
};

const interpolate = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export interface ConvertPageOptions {
  /** Target format is fixed for this page (used by /{from}-to-{to}). */
  presetTo?: string;
  /** If true, read `to` and `from` from URL query on load (used by /convert). */
  readUrlParams?: boolean;
  /** Default target format when neither presetTo nor URL params resolve. */
  defaultTo?: string;
  /** i18n labels (defaults to English). */
  labels?: ConvertLabels;
}

/** Read `<meta name="x-preset-to" content="...">` if present — lets the same
 * shared module serve both /convert and /{from}-to-{to} without `define:vars`. */
function readPresetFromMeta(): string | undefined {
  const el = document.querySelector<HTMLMetaElement>(
    'meta[name="x-preset-to"]',
  );
  return el?.content || undefined;
}

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  bmp: 'image/bmp',
  gif: 'image/gif',
  webp: 'image/webp',
};

const formatSize = (b: number) =>
  b < 1024 * 1024
    ? (b / 1024).toFixed(1) + ' KB'
    : (b / 1024 / 1024).toFixed(2) + ' MB';

export function initConvertPage(opts: ConvertPageOptions = {}) {
  const labels = opts.labels ?? DEFAULT_LABELS;
  setClipboardLabels({
    notSupported: labels.clipboardNotSupported,
    canvasError: labels.canvasError,
    pngFailed: labels.pngFailed,
    copying: labels.copying,
    copied: labels.copied,
    copyFailed: labels.copyFailed,
  });
  setCompareLabels({
    before: labels.compareBefore,
    after: labels.compareAfter,
    compareBtn: labels.compareBtn,
  });

  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById(
    'file-input',
  ) as HTMLInputElement | null;
  const options = document.getElementById('options');
  const fileList = document.getElementById('file-list');
  const convertBtn = document.getElementById(
    'convert-btn',
  ) as HTMLButtonElement | null;
  const results = document.getElementById('results');
  const formatBtns =
    document.querySelectorAll<HTMLButtonElement>('.format-btn');
  const qualityBtns =
    document.querySelectorAll<HTMLButtonElement>('.quality-btn');
  const qualityOption = document.getElementById('quality-option');
  const detectedFormatSpan = document.getElementById('detected-format');

  // Resolve preset: explicit opt > <meta> on page > URL param (if enabled) > default.
  const presetTo = opts.presetTo ?? readPresetFromMeta();

  let files: { file: File; id: string; originalUrl: string }[] = [];
  let imageConverter: any = null;
  let targetFormat = presetTo ?? opts.defaultTo ?? 'jpg';
  let quality = 90;

  getImageConverter().then((c) => (imageConverter = c));

  const applyTargetFormat = (fmt: string) => {
    targetFormat = fmt;
    formatBtns.forEach((b) => {
      const active = b.dataset.format === fmt;
      b.classList.toggle('bg-[#171717]', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-gray-600', !active);
    });
    qualityOption?.classList.toggle('hidden', fmt !== 'jpg');
  };

  if (presetTo) {
    // Preset mode (either explicit opt or <meta>): no interactive picker, just
    // honor quality-option visibility for JPG.
    qualityOption?.classList.toggle('hidden', presetTo !== 'jpg');
  } else {
    formatBtns.forEach((btn) => {
      btn.addEventListener('click', () =>
        applyTargetFormat(btn.dataset.format!),
      );
    });
    if (opts.readUrlParams) {
      const urlTo = new URLSearchParams(location.search).get('to');
      if (urlTo) applyTargetFormat(urlTo);
      else applyTargetFormat(targetFormat);
    } else {
      applyTargetFormat(targetFormat);
    }
  }

  qualityBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      qualityBtns.forEach((b) => {
        b.classList.remove('bg-[#171717]', 'text-white');
        b.classList.add('text-gray-600');
      });
      btn.classList.add('bg-[#171717]', 'text-white');
      btn.classList.remove('text-gray-600');
      quality = parseInt(btn.dataset.quality!);
    });
  });

  uploadZone?.addEventListener('click', () => fileInput?.click());
  uploadZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('border-[#171717]', 'bg-gray-50');
  });
  uploadZone?.addEventListener('dragleave', () => {
    uploadZone.classList.remove('border-[#171717]', 'bg-gray-50');
  });
  uploadZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('border-[#171717]', 'bg-gray-50');
    if (e.dataTransfer?.files) handleFiles(Array.from(e.dataTransfer.files));
  });
  fileInput?.addEventListener('change', () => {
    if (fileInput.files) handleFiles(Array.from(fileInput.files));
  });

  async function handleFiles(newFiles: File[]) {
    files.forEach((f) => URL.revokeObjectURL(f.originalUrl));
    const imgs = newFiles.filter((f) => f.type.startsWith('image/'));
    if (imgs.length > 0 && imageConverter && detectedFormatSpan) {
      try {
        const buf = new Uint8Array(await imgs[0].arrayBuffer());
        const info = await imageConverter.getImageInfo(buf);
        if (info.format)
          detectedFormatSpan.textContent = info.format.toUpperCase();
      } catch (e) {
        console.error('Failed to detect format:', e);
      }
    }
    files = imgs.map((file) => ({
      file,
      id: crypto.randomUUID(),
      originalUrl: URL.createObjectURL(file),
    }));
    renderFileList();
    options?.classList.remove('hidden');
    uploadZone?.classList.add('hidden');
  }

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = files
      .map(
        ({ file, id, originalUrl }) => `
      <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
        <img src="${originalUrl}" alt="" class="w-10 h-10 object-cover rounded bg-gray-100 border border-gray-200" />
        <div class="flex-1 min-w-0">
          <p class="text-sm text-[#171717] truncate">${escapeHtml(file.name)}</p>
          <p class="text-xs text-gray-400">${formatSize(file.size)}</p>
        </div>
        <button data-remove="${id}" class="text-gray-400 hover:text-red-500">✕</button>
      </div>
    `,
      )
      .join('');
    fileList
      .querySelectorAll<HTMLButtonElement>('[data-remove]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const removed = files.find((f) => f.id === btn.dataset.remove);
          if (removed) URL.revokeObjectURL(removed.originalUrl);
          files = files.filter((f) => f.id !== btn.dataset.remove);
          renderFileList();
          if (files.length === 0) {
            options?.classList.add('hidden');
            uploadZone?.classList.remove('hidden');
            results?.classList.add('hidden');
            if (detectedFormatSpan)
              detectedFormatSpan.textContent = labels.autoDetect;
          }
        });
      });
  }

  let resultsList: any[] = [];

  convertBtn?.addEventListener('click', async () => {
    if (!imageConverter) {
      alert(labels.loading);
      return;
    }
    const origText = convertBtn.textContent;
    convertBtn.textContent = labels.processing;
    convertBtn.disabled = true;

    resultsList.forEach((r) => r.url && URL.revokeObjectURL(r.url));
    resultsList = [];
    for (const { file, originalUrl } of files) {
      try {
        const buf = new Uint8Array(await file.arrayBuffer());
        const out = await imageConverter.convertImage(
          buf,
          targetFormat,
          quality,
        );
        const mime = MIME[targetFormat] || 'image/png';
        const blob = new Blob([out], { type: mime });
        const newName = file.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat;
        resultsList.push({
          newName,
          url: URL.createObjectURL(blob),
          originalUrl,
          blob,
          mime,
          size: blob.size,
        });
      } catch (err) {
        console.error(err);
        resultsList.push({ originalName: file.name, error: true });
      }
    }

    if (results) {
      results.innerHTML = resultsList
        .map((item, idx) =>
          item.error
            ? `
        <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <span class="text-red-500 text-sm">${escapeHtml(interpolate(labels.convertFailedTemplate, { name: item.originalName }))}</span>
        </div>
      `
            : `
        <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <button type="button" data-compare-idx="${idx}" class="flex items-center gap-1 rounded hover:ring-2 hover:ring-[#171717]/20 transition-all" title="${escapeHtml(labels.compareBtn)}" aria-label="${escapeHtml(labels.compareBtn)}">
            ${thumbPairHtml(item.originalUrl, item.url)}
          </button>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(item.newName)}</p>
            <p class="text-xs text-gray-400">${formatSize(item.size)}</p>
          </div>
          <button data-copy-idx="${idx}" class="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded hover:border-[#171717] hover:text-[#171717]">${escapeHtml(labels.copyBtn)}</button>
          <a href="${item.url}" download="${escapeHtml(item.newName)}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800">${escapeHtml(labels.downloadBtn)}</a>
        </div>
      `,
        )
        .join('');
      results.classList.remove('hidden');

      results
        .querySelectorAll<HTMLButtonElement>('[data-copy-idx]')
        .forEach((btn) => {
          const item = resultsList[Number(btn.dataset.copyIdx)];
          if (item && !item.error)
            bindCopyButton(btn, () => ({ blob: item.blob, mime: item.mime }));
        });

      results
        .querySelectorAll<HTMLButtonElement>('[data-compare-idx]')
        .forEach((btn) => {
          btn.addEventListener('click', () => {
            const item = resultsList[Number(btn.dataset.compareIdx)];
            if (item && !item.error)
              openCompare(item.originalUrl, item.url, item.newName);
          });
        });
    }

    convertBtn.textContent = origText ?? labels.startConvert;
    convertBtn.disabled = false;
  });
}
