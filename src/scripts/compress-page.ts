// Shared behavior for /compress and /compress-{format} landing pages.
// Expects these element IDs to exist in the page:
//   #upload-zone, #file-input, #options, #file-list, #results, #compress-btn
// and buttons matching `.mode-btn[data-mode="smart|light|strong"]`.

import { getImageConverter } from '../wasm/rust-image-converter.js';
import { bindCopyButton, setClipboardLabels } from './clipboard';
import { openCompare, setCompareLabels, thumbPairHtml } from './image-compare';

type Mode = 'smart' | 'light' | 'strong';

export interface CompressLabels {
  loading: string;
  processing: string;
  startCompress: string;
  processingFailedTemplate: string;
  savedPercentTemplate: string;
  optimized: string;
  copyBtn: string;
  downloadBtn: string;
  copying: string;
  copied: string;
  copyFailed: string;
  canvasError: string;
  pngFailed: string;
  clipboardNotSupported: string;
  compareBtn: string;
  compareBefore: string;
  compareAfter: string;
}

const DEFAULT_LABELS: CompressLabels = {
  loading: 'Loading, please try again shortly',
  processing: 'Processing...',
  startCompress: 'Start compressing',
  processingFailedTemplate: 'Failed: {name}',
  savedPercentTemplate: '· saved {pct}%',
  optimized: '· already optimized',
  copyBtn: 'Copy',
  downloadBtn: 'Download',
  copying: 'Copying...',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  canvasError: 'Failed to create canvas context',
  pngFailed: 'PNG generation failed',
  clipboardNotSupported: 'Clipboard API is not supported in this browser',
  compareBtn: 'Compare',
  compareBefore: 'Before',
  compareAfter: 'After',
};

const interpolate = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export interface CompressPageOptions {
  /** Read `mode` from `?mode=` query param on load. Used by /compress. */
  readUrlParams?: boolean;
  /** Override the starting mode. */
  defaultMode?: Mode;
  /** i18n labels (defaults to English). */
  labels?: CompressLabels;
}

const formatSize = (b: number) =>
  b < 1024 * 1024
    ? (b / 1024).toFixed(1) + ' KB'
    : (b / 1024 / 1024).toFixed(2) + ' MB';

export function initCompressPage(opts: CompressPageOptions = {}) {
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
  const compressBtn = document.getElementById(
    'compress-btn',
  ) as HTMLButtonElement | null;
  const results = document.getElementById('results');
  const modeBtns = document.querySelectorAll<HTMLButtonElement>('.mode-btn');

  let files: { file: File; id: string; originalUrl: string }[] = [];
  let imageConverter: any = null;
  let mode: Mode = opts.defaultMode ?? 'smart';

  getImageConverter().then((c) => (imageConverter = c));

  const activateMode = (next: Mode) => {
    mode = next;
    modeBtns.forEach((b) => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('bg-[#171717]', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-gray-600', !active);
    });
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => activateMode(btn.dataset.mode as Mode));
  });

  if (opts.readUrlParams) {
    const presetMode = new URLSearchParams(location.search).get('mode');
    if (
      presetMode === 'smart' ||
      presetMode === 'light' ||
      presetMode === 'strong'
    ) {
      activateMode(presetMode);
    }
  }

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

  function handleFiles(newFiles: File[]) {
    files.forEach((f) => URL.revokeObjectURL(f.originalUrl));
    const imgs = newFiles.filter((f) => f.type.startsWith('image/'));
    files = imgs.map((file) => ({
      file,
      id: Math.random().toString(36).slice(2, 11),
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
          }
        });
      });
  }

  let resultsList: any[] = [];

  compressBtn?.addEventListener('click', async () => {
    if (!imageConverter) {
      alert(labels.loading);
      return;
    }
    const origText = compressBtn.textContent;
    compressBtn.textContent = labels.processing;
    compressBtn.disabled = true;

    // Release object URLs from the previous batch so they don't leak across re-runs.
    resultsList.forEach((r) => r.url && URL.revokeObjectURL(r.url));
    resultsList = [];
    for (const { file, originalUrl } of files) {
      try {
        const buf = new Uint8Array(await file.arrayBuffer());
        const originalSize = buf.length;
        let r: any;
        if (mode === 'smart') {
          r = await imageConverter.smartCompress(buf);
        } else {
          const quality = mode === 'light' ? 85 : 60;
          const out = await imageConverter.compressImage(buf, { quality });
          r = {
            data: out,
            originalSize,
            compressedSize: out.length,
            compressionRatio: +(
              ((originalSize - out.length) / originalSize) *
              100
            ).toFixed(1),
          };
        }
        const blob = new Blob([r.data], { type: file.type });
        resultsList.push({
          name: file.name,
          url: URL.createObjectURL(blob),
          originalUrl,
          blob,
          mime: file.type,
          originalSize: r.originalSize,
          compressedSize: r.compressedSize,
          ratio: r.compressionRatio,
        });
      } catch (err) {
        console.error(err);
        resultsList.push({ name: file.name, error: true });
      }
    }

    if (results) {
      results.innerHTML = resultsList
        .map((item, idx) =>
          item.error
            ? `
        <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <span class="text-red-500 text-sm">${escapeHtml(interpolate(labels.processingFailedTemplate, { name: item.name }))}</span>
        </div>
      `
            : `
        <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <button type="button" data-compare-idx="${idx}" class="group flex items-center gap-1 rounded hover:ring-2 hover:ring-[#171717]/20 transition-all" title="${escapeHtml(labels.compareBtn)}" aria-label="${escapeHtml(labels.compareBtn)}">
            ${thumbPairHtml(item.originalUrl, item.url)}
          </button>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(item.name)}</p>
            <p class="text-xs text-gray-400">
              ${formatSize(item.originalSize)} → ${formatSize(item.compressedSize)}
              <span class="ml-1 ${item.ratio > 0 ? 'text-[#171717] font-semibold' : 'text-gray-500'}">
                ${item.ratio > 0 ? escapeHtml(interpolate(labels.savedPercentTemplate, { pct: item.ratio })) : escapeHtml(labels.optimized)}
              </span>
            </p>
          </div>
          <button data-copy-idx="${idx}" class="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded hover:border-[#171717] hover:text-[#171717]">${escapeHtml(labels.copyBtn)}</button>
          <a href="${item.url}" download="compressed_${escapeHtml(item.name)}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800">${escapeHtml(labels.downloadBtn)}</a>
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
              openCompare(item.originalUrl, item.url, item.name);
          });
        });
    }

    compressBtn.textContent = origText ?? labels.startCompress;
    compressBtn.disabled = false;
  });
}
