// Shared behavior for /convert and /{from}-to-{to} landing pages.
// Expects element IDs: #upload-zone, #file-input, #options, #file-list, #results, #convert-btn
// When `presetTo` is omitted, the page must provide `.format-btn[data-format=...]` buttons
// for target format selection; when `presetTo` is provided, those buttons are ignored.
// Optional: `.quality-btn[data-quality=...]` for JPG quality presets, and
// `#quality-option` wrapper, and `#detected-format` span for showing the detected input format.

import { getImageConverter } from '../wasm/rust-image-converter.js';

export interface ConvertPageOptions {
  /** Target format is fixed for this page (used by /{from}-to-{to}). */
  presetTo?: string;
  /** If true, read `to` and `from` from URL query on load (used by /convert). */
  readUrlParams?: boolean;
  /** Default target format when neither presetTo nor URL params resolve. */
  defaultTo?: string;
}

/** Read `<meta name="x-preset-to" content="...">` if present — lets the same
 * shared module serve both /convert and /{from}-to-{to} without `define:vars`. */
function readPresetFromMeta(): string | undefined {
  const el = document.querySelector<HTMLMetaElement>('meta[name="x-preset-to"]');
  return el?.content || undefined;
}

const MIME: Record<string, string> = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  bmp: 'image/bmp', gif: 'image/gif', webp: 'image/webp',
};

const formatSize = (b: number) =>
  b < 1024 * 1024 ? (b / 1024).toFixed(1) + ' KB' : (b / 1024 / 1024).toFixed(2) + ' MB';

export function initConvertPage(opts: ConvertPageOptions = {}) {
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
  const options = document.getElementById('options');
  const fileList = document.getElementById('file-list');
  const convertBtn = document.getElementById('convert-btn') as HTMLButtonElement | null;
  const results = document.getElementById('results');
  const formatBtns = document.querySelectorAll<HTMLButtonElement>('.format-btn');
  const qualityBtns = document.querySelectorAll<HTMLButtonElement>('.quality-btn');
  const qualityOption = document.getElementById('quality-option');
  const detectedFormatSpan = document.getElementById('detected-format');

  // Resolve preset: explicit opt > <meta> on page > URL param (if enabled) > default.
  const presetTo = opts.presetTo ?? readPresetFromMeta();

  let files: { file: File; id: string }[] = [];
  let imageConverter: any = null;
  let targetFormat = presetTo ?? opts.defaultTo ?? 'jpg';
  let quality = 90;

  getImageConverter().then(c => (imageConverter = c));

  const applyTargetFormat = (fmt: string) => {
    targetFormat = fmt;
    formatBtns.forEach(b => {
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
    formatBtns.forEach(btn => {
      btn.addEventListener('click', () => applyTargetFormat(btn.dataset.format!));
    });
    if (opts.readUrlParams) {
      const urlTo = new URLSearchParams(location.search).get('to');
      if (urlTo) applyTargetFormat(urlTo);
      else applyTargetFormat(targetFormat);
    } else {
      applyTargetFormat(targetFormat);
    }
  }

  qualityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      qualityBtns.forEach(b => {
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
    const imgs = newFiles.filter(f => f.type.startsWith('image/'));
    if (imgs.length > 0 && imageConverter && detectedFormatSpan) {
      try {
        const buf = new Uint8Array(await imgs[0].arrayBuffer());
        const info = await imageConverter.getImageInfo(buf);
        if (info.format) detectedFormatSpan.textContent = info.format.toUpperCase();
      } catch (e) { console.error('Failed to detect format:', e); }
    }
    files = imgs.map(file => ({ file, id: Math.random().toString(36).slice(2, 11) }));
    renderFileList();
    options?.classList.remove('hidden');
    uploadZone?.classList.add('hidden');
  }

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = files.map(({ file, id }) => `
      <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
        <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-[#171717] truncate">${file.name}</p>
          <p class="text-xs text-gray-400">${formatSize(file.size)}</p>
        </div>
        <button data-remove="${id}" class="text-gray-400 hover:text-red-500">✕</button>
      </div>
    `).join('');
    fileList.querySelectorAll<HTMLButtonElement>('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        files = files.filter(f => f.id !== btn.dataset.remove);
        renderFileList();
        if (files.length === 0) {
          options?.classList.add('hidden');
          uploadZone?.classList.remove('hidden');
          results?.classList.add('hidden');
          if (detectedFormatSpan) detectedFormatSpan.textContent = '自动检测';
        }
      });
    });
  }

  convertBtn?.addEventListener('click', async () => {
    if (!imageConverter) { alert('加载中，请稍后再试'); return; }
    const origText = convertBtn.textContent;
    convertBtn.textContent = '处理中...';
    convertBtn.disabled = true;

    const resultsList: any[] = [];
    for (const { file } of files) {
      try {
        const buf = new Uint8Array(await file.arrayBuffer());
        const out = await imageConverter.convertImage(buf, targetFormat, quality);
        const blob = new Blob([out], { type: MIME[targetFormat] || 'image/png' });
        const newName = file.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat;
        resultsList.push({ newName, url: URL.createObjectURL(blob), size: blob.size });
      } catch (err) {
        console.error(err);
        resultsList.push({ originalName: file.name, error: true });
      }
    }

    if (results) {
      results.innerHTML = resultsList.map(item => item.error ? `
        <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <span class="text-red-500 text-sm">转换失败：${item.originalName}</span>
        </div>
      ` : `
        <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${item.newName}</p>
            <p class="text-xs text-gray-400">${formatSize(item.size)}</p>
          </div>
          <a href="${item.url}" download="${item.newName}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800">下载</a>
        </div>
      `).join('');
      results.classList.remove('hidden');
    }

    convertBtn.textContent = origText ?? '开始转换';
    convertBtn.disabled = false;
  });
}
