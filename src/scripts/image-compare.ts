export interface CompareLabels {
  before: string;
  after: string;
  compareBtn: string;
  close: string;
}

const DEFAULT_LABELS: CompareLabels = {
  before: 'Before',
  after: 'After',
  compareBtn: 'Compare',
  close: 'Close',
};

let labels: CompareLabels = DEFAULT_LABELS;

export function setCompareLabels(next: Partial<CompareLabels>) {
  labels = { ...labels, ...next };
}

export function getCompareLabels(): CompareLabels {
  return labels;
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function thumbPairHtml(beforeUrl: string, afterUrl: string): string {
  const beforeAlt = escapeAttr(labels.before);
  const afterAlt = escapeAttr(labels.after);
  return `
    <div class="flex items-center gap-1">
      <img src="${escapeAttr(beforeUrl)}" alt="${beforeAlt}" loading="lazy"
        class="w-10 h-10 object-cover rounded bg-gray-100 border border-gray-200" />
      <img src="${escapeAttr(afterUrl)}" alt="${afterAlt}" loading="lazy"
        class="w-10 h-10 object-cover rounded bg-gray-100 border border-gray-200" />
    </div>
  `;
}

let lightbox: HTMLElement | null = null;
let stage: HTMLElement | null = null;
let beforeImg: HTMLImageElement | null = null;
let afterImg: HTMLImageElement | null = null;
let beforeLabel: HTMLElement | null = null;
let afterLabel: HTMLElement | null = null;
let titleEl: HTMLElement | null = null;
let dragging = false;

function ensureLightbox() {
  if (lightbox) return;

  lightbox = document.createElement('div');
  lightbox.className =
    'fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 hidden';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `
    <button type="button" class="compare-close absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors" aria-label="${escapeAttr(labels.close)}">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <div class="compare-title absolute top-5 left-4 right-16 text-white/80 text-sm truncate pointer-events-none"></div>
    <div class="compare-stage relative max-w-full max-h-[85vh] select-none touch-none" style="--split: 50%">
      <img class="compare-after block max-w-full max-h-[85vh] pointer-events-none" alt="" />
      <img class="compare-before absolute inset-0 w-full h-full object-contain pointer-events-none"
        alt=""
        style="clip-path: inset(0 calc(100% - var(--split)) 0 0)" />
      <span class="compare-label-before absolute top-2 left-2 px-2 py-1 text-xs bg-black/60 text-white rounded pointer-events-none"></span>
      <span class="compare-label-after absolute top-2 right-2 px-2 py-1 text-xs bg-black/60 text-white rounded pointer-events-none"></span>
      <div class="compare-divider absolute top-0 bottom-0 w-px bg-white pointer-events-none" style="left: var(--split); transform: translateX(-50%)">
        <div class="compare-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l-4 5 4 5M16 7l4 5-4 5"></path>
          </svg>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  stage = lightbox.querySelector<HTMLElement>('.compare-stage');
  beforeImg = lightbox.querySelector<HTMLImageElement>('.compare-before');
  afterImg = lightbox.querySelector<HTMLImageElement>('.compare-after');
  beforeLabel = lightbox.querySelector<HTMLElement>('.compare-label-before');
  afterLabel = lightbox.querySelector<HTMLElement>('.compare-label-after');
  titleEl = lightbox.querySelector<HTMLElement>('.compare-title');

  const closeBtn = lightbox.querySelector<HTMLButtonElement>('.compare-close');
  closeBtn?.addEventListener('click', closeCompare);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeCompare();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeCompare();
  });

  const setSplitFromEvent = (clientX: number) => {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    stage.style.setProperty('--split', pct + '%');
  };

  stage?.addEventListener('pointerdown', (e) => {
    if (!stage) return;
    dragging = true;
    stage.setPointerCapture?.(e.pointerId);
    setSplitFromEvent(e.clientX);
    e.preventDefault();
  });
  stage?.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setSplitFromEvent(e.clientX);
  });
  const endDrag = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    stage?.releasePointerCapture?.(e.pointerId);
  };
  stage?.addEventListener('pointerup', endDrag);
  stage?.addEventListener('pointercancel', endDrag);
}

export function openCompare(beforeUrl: string, afterUrl: string, title = '') {
  ensureLightbox();
  if (!lightbox || !beforeImg || !afterImg || !stage) return;

  beforeImg.src = beforeUrl;
  afterImg.src = afterUrl;
  if (beforeLabel) beforeLabel.textContent = labels.before;
  if (afterLabel) afterLabel.textContent = labels.after;
  if (titleEl) titleEl.textContent = title;

  stage.style.setProperty('--split', '50%');
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeCompare() {
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
  dragging = false;
  if (beforeImg) beforeImg.src = '';
  if (afterImg) afterImg.src = '';
}
