// Client script for /compress-mp3.
//
// Decodes audio via Web Audio (AudioContext.decodeAudioData — supports
// MP3/M4A/WAV/FLAC/OGG) and re-encodes as MP3 at a user-selected lower
// bitrate, via the Rust wasm encoder in mp3-bridge.
//
// UX differs from /mp4-to-mp3 by showing an original→compressed size
// comparison with reduction %.

import { encodeMp3 } from '../wasm/mp3-bridge';

type Bitrate = 64 | 96 | 128 | 192;

const MAX_BYTES = 500 * 1024 * 1024;

export interface CompressMp3Labels {
  preparing: string;
  decoding: string;
  encodingTemplate: string;
  done: string;
  startBtn: string;
  downloadBtn: string;
  sizeTemplate: string;
  reductionTemplate: string;
  tooLargeTemplate: string;
  decodeFailedSafari: string;
  decodeFailedGeneric: string;
  audioEncodeFailed: string;
}

const DEFAULT_LABELS: CompressMp3Labels = {
  preparing: 'Preparing...',
  decoding: 'Decoding audio...',
  encodingTemplate: 'Compressing · {pct}%',
  done: 'Done',
  startBtn: 'Compress',
  downloadBtn: 'Download',
  sizeTemplate: 'Size: {size}',
  reductionTemplate: 'Saved {pct}% · {before} → {after}',
  tooLargeTemplate: 'File too large — max 500MB (current {size})',
  decodeFailedSafari:
    'Could not decode this file. Try Chrome / Firefox or upgrade Safari.',
  decodeFailedGeneric: 'Could not decode the audio in this file.',
  audioEncodeFailed: 'Audio encoding failed',
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

function floatToInt16(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

export interface CompressMp3Options {
  labels?: Partial<CompressMp3Labels>;
}

export function initCompressMp3Page(opts: CompressMp3Options = {}) {
  const labels: CompressMp3Labels = {
    ...DEFAULT_LABELS,
    ...(opts.labels ?? {}),
  };

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
  const progress = document.getElementById('progress');
  const progressFill =
    progress?.querySelector<HTMLElement>('.progress-fill') ?? null;
  const progressLabel = document.getElementById('progress-label');
  const bitrateBtns =
    document.querySelectorAll<HTMLButtonElement>('.bitrate-btn');

  let currentFile: File | null = null;
  let bitrate: Bitrate = 128;
  let lastObjectUrl: string | null = null;

  const setBitrate = (next: Bitrate) => {
    bitrate = next;
    bitrateBtns.forEach((b) => {
      const active = Number(b.dataset.bitrate) === bitrate;
      b.classList.toggle('bg-[#171717]', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('text-gray-600', !active);
    });
  };
  setBitrate(128);

  bitrateBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = Number(btn.dataset.bitrate);
      if (v === 64 || v === 96 || v === 128 || v === 192) setBitrate(v);
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
    const f = e.dataTransfer?.files?.[0];
    if (f) acceptFile(f);
  });
  fileInput?.addEventListener('change', () => {
    const f = fileInput.files?.[0];
    if (f) acceptFile(f);
  });

  function showError(msg: string) {
    if (!results) return;
    results.innerHTML = `
      <div class="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
        <span class="text-red-500 text-sm">${escapeHtml(msg)}</span>
      </div>
    `;
    results.classList.remove('hidden');
  }

  function acceptFile(file: File) {
    if (file.size > MAX_BYTES) {
      showError(
        interpolate(labels.tooLargeTemplate, { size: formatSize(file.size) }),
      );
      return;
    }
    currentFile = file;
    renderFileList();
    options?.classList.remove('hidden');
    uploadZone?.classList.add('hidden');
    results?.classList.add('hidden');
    if (results) results.innerHTML = '';
  }

  function renderFileList() {
    if (!fileList || !currentFile) return;
    const f = currentFile;
    fileList.innerHTML = `
      <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
        <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19a3 3 0 11-6 0 3 3 0 016 0zm12-3a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-[#171717] truncate">${escapeHtml(f.name)}</p>
          <p class="text-xs text-gray-400">${formatSize(f.size)}</p>
        </div>
        <button id="remove-file" class="text-gray-400 hover:text-red-500" aria-label="Remove">✕</button>
      </div>
    `;
    document.getElementById('remove-file')?.addEventListener('click', () => {
      currentFile = null;
      fileList.innerHTML = '';
      options?.classList.add('hidden');
      uploadZone?.classList.remove('hidden');
      results?.classList.add('hidden');
      if (results) results.innerHTML = '';
    });
  }

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

  async function decode(file: File): Promise<AudioBuffer> {
    const Ctor: typeof AudioContext =
      (window as any).AudioContext ?? (window as any).webkitAudioContext;
    const ctx = new Ctor();
    try {
      const buf = await file.arrayBuffer();
      return await ctx.decodeAudioData(buf);
    } finally {
      ctx.close?.().catch(() => {});
    }
  }

  async function compress(audio: AudioBuffer, kbps: Bitrate): Promise<Blob> {
    const channels = Math.min(2, audio.numberOfChannels) as 1 | 2;
    const sampleRate = audio.sampleRate;
    const left = floatToInt16(audio.getChannelData(0));
    const right = channels === 2 ? floatToInt16(audio.getChannelData(1)) : null;

    const blob = await encodeMp3({
      channels,
      sampleRate,
      kbps,
      left,
      right,
      onProgress: (pct) =>
        setProgress(pct, interpolate(labels.encodingTemplate, { pct })),
    });
    setProgress(100, labels.done);
    return blob;
  }

  function renderResult(file: File, blob: Blob) {
    if (!results) return;
    if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
    const url = URL.createObjectURL(blob);
    lastObjectUrl = url;
    const downloadName = `${stripExt(file.name)}.mp3`;
    const reductionPct = Math.max(
      0,
      Math.round(((file.size - blob.size) / file.size) * 100),
    );
    const reduction = interpolate(labels.reductionTemplate, {
      pct: reductionPct,
      before: formatSize(file.size),
      after: formatSize(blob.size),
    });
    results.innerHTML = `
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19a3 3 0 11-6 0 3 3 0 016 0zm12-3a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-[#171717] truncate">${escapeHtml(downloadName)}</p>
            <p class="text-xs text-gray-500 mt-0.5">${escapeHtml(reduction)}</p>
          </div>
          <a href="${url}" download="${escapeHtml(downloadName)}" class="px-3 py-1.5 bg-[#171717] text-white text-sm rounded hover:bg-gray-800 whitespace-nowrap">${escapeHtml(labels.downloadBtn)}</a>
        </div>
        <audio controls src="${url}" preload="metadata" class="w-full"></audio>
      </div>
    `;
    results.classList.remove('hidden');
  }

  convertBtn?.addEventListener('click', async () => {
    if (!currentFile) return;
    const origText = convertBtn.textContent;
    convertBtn.disabled = true;
    convertBtn.textContent = labels.preparing;
    if (results) results.innerHTML = '';
    results?.classList.add('hidden');
    setProgress(0, labels.decoding);

    try {
      const audio = await decode(currentFile);
      setProgress(0, interpolate(labels.encodingTemplate, { pct: 0 }));
      const blob = await compress(audio, bitrate);
      renderResult(currentFile, blob);
    } catch (err) {
      console.error(err);
      const msg =
        err instanceof DOMException ||
        (err instanceof Error && /decode/i.test(err.message))
          ? labels.decodeFailedGeneric
          : labels.audioEncodeFailed;
      const isSafari =
        /safari/i.test(navigator.userAgent) &&
        !/chrome|chromium|crios/i.test(navigator.userAgent);
      showError(
        isSafari && msg === labels.decodeFailedGeneric
          ? labels.decodeFailedSafari
          : msg,
      );
    } finally {
      hideProgress();
      convertBtn.textContent = origText ?? labels.startBtn;
      convertBtn.disabled = false;
    }
  });
}
