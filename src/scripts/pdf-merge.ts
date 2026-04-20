// Client script for /pdf-merge.
//
// Collects PDFs via drag/click/paste, lets users reorder via ▲ / ▼ pill
// controls, then copies each source's pages into a new PDFDocument in list
// order. Single output blob auto-downloaded with a timestamped filename.

import { installPasteHandler } from './paste-image';

const MAX_BYTES = 200 * 1024 * 1024;

export interface PdfMergeLabels {
  mergeBtn: string;
  clearAllBtn: string;
  preparing: string;
  loadingTemplate: string;
  writing: string;
  done: string;
  ready: string;
  downloadBtn: string;
  sizeTemplate: string;
  pageCountTemplate: string;
  tooLargeTemplate: string;
  notPdfTemplate: string;
  loadFailedTemplate: string;
  encryptedPdf: string;
  needTwoFiles: string;
  moveUpAria: string;
  moveDownAria: string;
  removeAria: string;
  positionTemplate: string;
  minFilesHint: string;
}

const DEFAULT_LABELS: PdfMergeLabels = {
  mergeBtn: 'Merge',
  clearAllBtn: 'Clear all',
  preparing: 'Preparing...',
  loadingTemplate: 'Loading · {cur}/{total}',
  writing: 'Writing...',
  done: 'Done',
  ready: 'Merged',
  downloadBtn: 'Download',
  sizeTemplate: 'Size: {size}',
  pageCountTemplate: '{pages} pages total',
  tooLargeTemplate: '{name} is too large — max 200MB (current {size})',
  notPdfTemplate: '{name} is not a PDF file',
  loadFailedTemplate: 'Could not read PDF: {name}',
  encryptedPdf: 'Encrypted or password-protected PDFs are not supported',
  needTwoFiles: 'At least 2 PDFs are required',
  moveUpAria: 'Move up',
  moveDownAria: 'Move down',
  removeAria: 'Remove',
  positionTemplate: '{i}/{total}',
  minFilesHint: 'At least 2 files are required to merge',
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

const formatSize = (b: number) =>
  b < 1024 * 1024
    ? (b / 1024).toFixed(1) + ' KB'
    : (b / 1024 / 1024).toFixed(2) + ' MB';

const pad = (n: number) => String(n).padStart(2, '0');
const timestamp = () => {
  const d = new Date();
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
};

const isPdfFile = (f: File) =>
  f.type === 'application/pdf' || /\.pdf$/i.test(f.name);

export interface PdfMergeOptions {
  labels?: Partial<PdfMergeLabels>;
}

export function initPdfMergePage(opts: PdfMergeOptions = {}) {
  const labels: PdfMergeLabels = {
    ...DEFAULT_LABELS,
    ...(opts.labels ?? {}),
  };

  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById(
    'file-input',
  ) as HTMLInputElement | null;
  const options = document.getElementById('options');
  const fileList = document.getElementById('file-list');
  const mergeBtn = document.getElementById(
    'merge-btn',
  ) as HTMLButtonElement | null;
  const clearBtn = document.getElementById(
    'clear-all-btn',
  ) as HTMLButtonElement | null;
  const minHint = document.getElementById('min-hint');
  const results = document.getElementById('results');
  const progress = document.getElementById('progress');
  const progressFill =
    progress?.querySelector<HTMLElement>('.progress-fill') ?? null;
  const progressLabel = document.getElementById('progress-label');

  const files: File[] = [];
  let lastUrl: string | null = null;

  function clearResults() {
    if (lastUrl) {
      URL.revokeObjectURL(lastUrl);
      lastUrl = null;
    }
    if (results) {
      results.innerHTML = '';
      results.classList.add('hidden');
    }
  }

  function syncChrome() {
    if (files.length === 0) {
      options?.classList.add('hidden');
      uploadZone?.classList.remove('hidden');
      minHint?.classList.add('hidden');
    } else {
      options?.classList.remove('hidden');
      uploadZone?.classList.add('hidden');
      const enough = files.length >= 2;
      if (mergeBtn) mergeBtn.disabled = !enough;
      minHint?.classList.toggle('hidden', enough);
    }
    renderFileList();
  }

  function renderFileList() {
    if (!fileList) return;
    if (files.length === 0) {
      fileList.innerHTML = '';
      return;
    }
    const total = files.length;
    fileList.innerHTML = files
      .map((f, i) => {
        const upDisabled = i === 0 ? 'disabled' : '';
        const downDisabled = i === total - 1 ? 'disabled' : '';
        const position = interpolate(labels.positionTemplate, {
          i: i + 1,
          total,
        });
        return `
        <div class="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(f.name)}</p>
            <p class="text-xs text-gray-400">${escapeHtml(position)} · ${formatSize(f.size)}</p>
          </div>
          <button data-move-up="${i}" ${upDisabled} class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#171717] disabled:opacity-20 disabled:cursor-not-allowed" aria-label="${escapeHtml(labels.moveUpAria)}">▲</button>
          <button data-move-down="${i}" ${downDisabled} class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#171717] disabled:opacity-20 disabled:cursor-not-allowed" aria-label="${escapeHtml(labels.moveDownAria)}">▼</button>
          <button data-remove="${i}" class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500" aria-label="${escapeHtml(labels.removeAria)}">✕</button>
        </div>
      `;
      })
      .join('');

    fileList
      .querySelectorAll<HTMLButtonElement>('[data-move-up]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.moveUp);
          if (idx > 0) {
            [files[idx - 1], files[idx]] = [files[idx], files[idx - 1]];
            syncChrome();
          }
        });
      });
    fileList
      .querySelectorAll<HTMLButtonElement>('[data-move-down]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.moveDown);
          if (idx >= 0 && idx < files.length - 1) {
            [files[idx], files[idx + 1]] = [files[idx + 1], files[idx]];
            syncChrome();
          }
        });
      });
    fileList
      .querySelectorAll<HTMLButtonElement>('[data-remove]')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.remove);
          if (Number.isInteger(idx)) {
            files.splice(idx, 1);
            syncChrome();
          }
        });
      });
  }

  function showError(msg: string) {
    if (!results) return;
    results.insertAdjacentHTML(
      'beforeend',
      `
      <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
        <span class="text-red-500 text-sm">${escapeHtml(msg)}</span>
      </div>
    `,
    );
    results.classList.remove('hidden');
  }

  function acceptFiles(incoming: File[]) {
    for (const f of incoming) {
      if (!isPdfFile(f)) {
        showError(interpolate(labels.notPdfTemplate, { name: f.name }));
        continue;
      }
      if (f.size > MAX_BYTES) {
        showError(
          interpolate(labels.tooLargeTemplate, {
            name: f.name,
            size: formatSize(f.size),
          }),
        );
        continue;
      }
      files.push(f);
    }
    syncChrome();
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
    const dropped = Array.from(e.dataTransfer?.files ?? []);
    if (dropped.length) acceptFiles(dropped);
  });
  fileInput?.addEventListener('change', () => {
    const picked = Array.from(fileInput.files ?? []);
    if (picked.length) acceptFiles(picked);
    fileInput.value = '';
  });

  installPasteHandler(
    (pasted) => acceptFiles(pasted),
    (it) => it.type === 'application/pdf',
  );

  clearBtn?.addEventListener('click', () => {
    files.length = 0;
    clearResults();
    syncChrome();
  });

  function setProgress(pct: number, label: string) {
    if (!progress) return;
    progress.classList.remove('hidden');
    if (progressFill)
      progressFill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    if (progressLabel) progressLabel.textContent = label;
  }

  function hideProgress() {
    progress?.classList.add('hidden');
    if (progressFill) progressFill.style.width = '0%';
    if (progressLabel) progressLabel.textContent = '';
  }

  function renderResult(url: string, blob: Blob, pages: number) {
    if (!results) return;
    const name = `merged-${timestamp()}.pdf`;
    const line = `${interpolate(labels.sizeTemplate, { size: formatSize(blob.size) })} · ${interpolate(labels.pageCountTemplate, { pages })}`;
    results.insertAdjacentHTML(
      'beforeend',
      `
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(name)}</p>
            <p class="text-xs text-gray-500 mt-0.5">${escapeHtml(line)}</p>
          </div>
          <a id="download-link" href="${url}" download="${escapeHtml(name)}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800 whitespace-nowrap">${escapeHtml(labels.downloadBtn)}</a>
        </div>
      </div>
    `,
    );
    results.classList.remove('hidden');
    document.getElementById('download-link')?.click();
  }

  mergeBtn?.addEventListener('click', async () => {
    if (files.length < 2) {
      showError(labels.needTwoFiles);
      return;
    }
    const origText = mergeBtn.textContent;
    mergeBtn.disabled = true;
    mergeBtn.textContent = labels.preparing;
    clearResults();
    setProgress(0, labels.preparing);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const out = await PDFDocument.create();
      let totalPages = 0;
      const total = files.length;
      for (let i = 0; i < total; i++) {
        setProgress(
          Math.round((i / total) * 90),
          interpolate(labels.loadingTemplate, { cur: i + 1, total }),
        );
        const buf = await files[i].arrayBuffer();
        let src;
        try {
          src = await PDFDocument.load(buf, { updateMetadata: false });
        } catch (err) {
          const msg =
            err instanceof Error && /encrypt/i.test(err.message)
              ? labels.encryptedPdf
              : interpolate(labels.loadFailedTemplate, {
                  name: files[i].name,
                });
          showError(msg);
          throw err;
        }
        const pages = await out.copyPages(src, src.getPageIndices());
        for (const p of pages) {
          out.addPage(p);
          totalPages++;
        }
      }

      setProgress(95, labels.writing);
      const bytes = (await out.save({ useObjectStreams: true })) as Uint8Array;
      const blob = new Blob([bytes as BlobPart], {
        type: 'application/pdf',
      });
      const url = URL.createObjectURL(blob);
      lastUrl = url;
      setProgress(100, labels.done);
      renderResult(url, blob, totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      hideProgress();
      mergeBtn.textContent = origText ?? labels.mergeBtn;
      mergeBtn.disabled = files.length < 2;
    }
  });

  syncChrome();
}
