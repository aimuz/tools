// Shared behavior for /compress and /compress-{format} landing pages.
// Expects these element IDs to exist in the page:
//   #upload-zone, #file-input, #options, #file-list, #results, #compress-btn
// and buttons matching `.mode-btn[data-mode="smart|light|strong"]`.

import { getImageConverter } from '../wasm/rust-image-converter.js';
import { bindCopyButton } from './clipboard';

type Mode = 'smart' | 'light' | 'strong';

export interface CompressPageOptions {
  /** Read `mode` from `?mode=` query param on load. Used by /compress. */
  readUrlParams?: boolean;
  /** Override the starting mode. */
  defaultMode?: Mode;
}

const formatSize = (b: number) =>
  b < 1024 * 1024 ? (b / 1024).toFixed(1) + ' KB' : (b / 1024 / 1024).toFixed(2) + ' MB';

export function initCompressPage(opts: CompressPageOptions = {}) {
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
  const options = document.getElementById('options');
  const fileList = document.getElementById('file-list');
  const compressBtn = document.getElementById('compress-btn') as HTMLButtonElement | null;
  const results = document.getElementById('results');
  const modeBtns = document.querySelectorAll<HTMLButtonElement>('.mode-btn');

  let files: { file: File; id: string }[] = [];
  let imageConverter: any = null;
  let mode: Mode = opts.defaultMode ?? 'smart';

  getImageConverter().then(c => (imageConverter = c));

  const activateMode = (next: Mode) => {
    mode = next;
    modeBtns.forEach(b => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('bg-[#171717]', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-gray-600', !active);
    });
  };

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => activateMode(btn.dataset.mode as Mode));
  });

  if (opts.readUrlParams) {
    const presetMode = new URLSearchParams(location.search).get('mode');
    if (presetMode === 'smart' || presetMode === 'light' || presetMode === 'strong') {
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
    const imgs = newFiles.filter(f => f.type.startsWith('image/'));
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
        }
      });
    });
  }

  let resultsList: any[] = [];

  compressBtn?.addEventListener('click', async () => {
    if (!imageConverter) { alert('加载中，请稍后再试'); return; }
    const origText = compressBtn.textContent;
    compressBtn.textContent = '处理中...';
    compressBtn.disabled = true;

    // Release object URLs from the previous batch so they don't leak across re-runs.
    resultsList.forEach(r => r.url && URL.revokeObjectURL(r.url));
    resultsList = [];
    for (const { file } of files) {
      try {
        const buf = new Uint8Array(await file.arrayBuffer());
        let r: any;
        if (mode === 'smart') {
          r = await imageConverter.smartCompress(buf);
        } else {
          const quality = mode === 'light' ? 85 : 60;
          const out = await imageConverter.compressImage(buf, { quality });
          r = {
            data: out,
            originalSize: buf.length,
            compressedSize: out.length,
            compressionRatio: +(((buf.length - out.length) / buf.length) * 100).toFixed(1),
          };
        }
        const blob = new Blob([r.data], { type: file.type });
        resultsList.push({
          name: file.name,
          url: URL.createObjectURL(blob),
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
      results.innerHTML = resultsList.map((item, idx) => item.error ? `
        <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <span class="text-red-500 text-sm">处理失败：${item.name}</span>
        </div>
      ` : `
        <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${item.name}</p>
            <p class="text-xs text-gray-400">
              ${formatSize(item.originalSize)} → ${formatSize(item.compressedSize)}
              <span class="ml-1 ${item.ratio > 0 ? 'text-[#171717] font-semibold' : 'text-gray-500'}">
                ${item.ratio > 0 ? '· 节省 ' + item.ratio + '%' : '· 已优化'}
              </span>
            </p>
          </div>
          <button data-copy-idx="${idx}" class="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded hover:border-[#171717] hover:text-[#171717]">复制</button>
          <a href="${item.url}" download="compressed_${item.name}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800">下载</a>
        </div>
      `).join('');
      results.classList.remove('hidden');

      results.querySelectorAll<HTMLButtonElement>('[data-copy-idx]').forEach(btn => {
        const item = resultsList[Number(btn.dataset.copyIdx)];
        if (item && !item.error) bindCopyButton(btn, () => ({ blob: item.blob, mime: item.mime }));
      });
    }

    compressBtn.textContent = origText ?? '开始压缩';
    compressBtn.disabled = false;
  });
}
