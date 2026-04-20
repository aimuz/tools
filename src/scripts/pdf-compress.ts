// Client script for /pdf-compress.
//
// Loads each selected PDF with pdf-lib, optionally strips Info-dict metadata,
// and re-saves with useObjectStreams. Savings on already-optimized PDFs are
// usually 5–15% (no image re-encoding in V1).

import { installPasteHandler } from './paste-image';

const MAX_BYTES = 200 * 1024 * 1024;

export interface PdfCompressLabels {
  startBtn: string;
  preparing: string;
  processingTemplate: string;
  done: string;
  ready: string;
  downloadBtn: string;
  sizeTemplate: string;
  reductionTemplate: string;
  noReduction: string;
  tooLargeTemplate: string;
  notPdfTemplate: string;
  loadFailedTemplate: string;
  encryptedPdf: string;
  stripMetadataLabel: string;
}

const DEFAULT_LABELS: PdfCompressLabels = {
  startBtn: 'Compress',
  preparing: 'Preparing...',
  processingTemplate: 'Processing · {cur}/{total}',
  done: 'Done',
  ready: 'Compressed',
  downloadBtn: 'Download',
  sizeTemplate: 'Size: {size}',
  reductionTemplate: 'Saved {pct}% · {before} → {after}',
  noReduction: 'No further reduction possible — original returned',
  tooLargeTemplate: '{name} is too large — max 200MB (current {size})',
  notPdfTemplate: '{name} is not a PDF file',
  loadFailedTemplate: 'Could not read PDF: {name}',
  encryptedPdf: 'Encrypted or password-protected PDFs are not supported',
  stripMetadataLabel: 'Strip metadata',
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

const stripExt = (name: string) => name.replace(/\.[^.]+$/, '');

const isPdfFile = (f: File) =>
  f.type === 'application/pdf' || /\.pdf$/i.test(f.name);

export interface PdfCompressOptions {
  labels?: Partial<PdfCompressLabels>;
}

interface ResultEntry {
  name: string;
  url: string;
  original: number;
  compressed: number;
  reduced: boolean;
}

export function initPdfCompressPage(opts: PdfCompressOptions = {}) {
  const labels: PdfCompressLabels = {
    ...DEFAULT_LABELS,
    ...(opts.labels ?? {}),
  };

  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById(
    'file-input',
  ) as HTMLInputElement | null;
  const options = document.getElementById('options');
  const fileList = document.getElementById('file-list');
  const compressBtn = document.getElementById(
    'compress-btn',
  ) as HTMLButtonElement | null;
  const stripCheckbox = document.getElementById(
    'strip-metadata',
  ) as HTMLInputElement | null;
  const results = document.getElementById('results');
  const progress = document.getElementById('progress');
  const progressFill =
    progress?.querySelector<HTMLElement>('.progress-fill') ?? null;
  const progressLabel = document.getElementById('progress-label');

  const files: File[] = [];
  const objectUrls: string[] = [];

  function clearResults() {
    objectUrls.forEach(URL.revokeObjectURL);
    objectUrls.length = 0;
    if (results) {
      results.innerHTML = '';
      results.classList.add('hidden');
    }
  }

  const fileKey = (f: File) => `${f.name}|${f.size}|${f.lastModified}`;

  function syncChrome() {
    if (files.length === 0) {
      options?.classList.add('hidden');
    } else {
      options?.classList.remove('hidden');
    }
    uploadZone?.classList.remove('hidden');
    renderFileList();
  }

  function renderFileList() {
    if (!fileList) return;
    if (files.length === 0) {
      fileList.innerHTML = '';
      return;
    }
    fileList.innerHTML = files
      .map(
        (f, i) => `
        <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(f.name)}</p>
            <p class="text-xs text-gray-400">${formatSize(f.size)}</p>
          </div>
          <button data-remove="${i}" class="text-gray-400 hover:text-red-500 w-8 h-8 rounded flex items-center justify-center" aria-label="Remove">✕</button>
        </div>
      `,
      )
      .join('');
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
    const seen = new Set(files.map(fileKey));
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
      const key = fileKey(f);
      if (seen.has(key)) continue;
      seen.add(key);
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

  function renderResult(entry: ResultEntry) {
    if (!results) return;
    const reductionPct = entry.reduced
      ? Math.max(
          0,
          Math.round(
            ((entry.original - entry.compressed) / entry.original) * 100,
          ),
        )
      : 0;
    const subtitle = entry.reduced
      ? interpolate(labels.reductionTemplate, {
          pct: reductionPct,
          before: formatSize(entry.original),
          after: formatSize(entry.compressed),
        })
      : labels.noReduction;
    const downloadName = `${stripExt(entry.name)}-compressed.pdf`;
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
            <p class="text-sm text-[#171717] truncate">${escapeHtml(entry.name)}</p>
            <p class="text-xs text-gray-500 mt-0.5">${escapeHtml(subtitle)}</p>
          </div>
          <a href="${entry.url}" download="${escapeHtml(downloadName)}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800 whitespace-nowrap">${escapeHtml(labels.downloadBtn)}</a>
        </div>
      </div>
    `,
    );
    results.classList.remove('hidden');
  }

  async function compressOne(file: File, PDFDocument: any): Promise<void> {
    const buf = await file.arrayBuffer();
    let doc;
    try {
      doc = await PDFDocument.load(buf, { updateMetadata: false });
    } catch (err) {
      const msg =
        err instanceof Error && /encrypt/i.test(err.message)
          ? labels.encryptedPdf
          : interpolate(labels.loadFailedTemplate, { name: file.name });
      showError(msg);
      return;
    }

    if (stripCheckbox?.checked) {
      doc.setTitle('');
      doc.setAuthor('');
      doc.setSubject('');
      doc.setKeywords([]);
      doc.setCreator('');
      doc.setProducer('');
    }

    const out = await doc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
    const reduced = out.byteLength < file.size;
    const payload = reduced ? out : new Uint8Array(await file.arrayBuffer());
    const blob = new Blob([payload], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    objectUrls.push(url);
    renderResult({
      name: file.name,
      url,
      original: file.size,
      compressed: reduced ? out.byteLength : file.size,
      reduced,
    });
  }

  compressBtn?.addEventListener('click', async () => {
    if (files.length === 0) return;
    const origText = compressBtn.textContent;
    compressBtn.disabled = true;
    compressBtn.textContent = labels.preparing;
    clearResults();
    setProgress(0, labels.preparing);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const total = files.length;
      for (let i = 0; i < total; i++) {
        setProgress(
          Math.round((i / total) * 100),
          interpolate(labels.processingTemplate, {
            cur: i + 1,
            total,
          }),
        );
        await compressOne(files[i], PDFDocument);
      }
      setProgress(100, labels.done);
    } catch (err) {
      console.error(err);
    } finally {
      hideProgress();
      compressBtn.textContent = origText ?? labels.startBtn;
      compressBtn.disabled = false;
    }
  });

  syncChrome();
}
