// Shared helpers for image-upload dropzones used by watermark tools.
// The dropzone is a `<label>` wrapping a hidden `<input type="file">`,
// an empty-state element `[data-zone="empty"]`, and a filled-state element
// `[data-zone="filled"]`. wireDropzone wires click + drag-and-drop; callers
// remain responsible for decoding the File and toggling zone state.

const ZONE_EMPTY = '[data-zone="empty"]';
const ZONE_FILLED = '[data-zone="filled"]';
const DRAG_RING = 'shadow-[0_0_0_2px_#171717]';

export function setZoneFilled(dropzone: HTMLElement): void {
  dropzone.querySelector<HTMLElement>(ZONE_EMPTY)?.classList.add('hidden');
  dropzone.querySelector<HTMLElement>(ZONE_FILLED)?.classList.remove('hidden');
}

export function setZoneEmpty(dropzone: HTMLElement): void {
  dropzone.querySelector<HTMLElement>(ZONE_EMPTY)?.classList.remove('hidden');
  dropzone.querySelector<HTMLElement>(ZONE_FILLED)?.classList.add('hidden');
}

export function wireDropzone(
  dropzone: HTMLLabelElement,
  input: HTMLInputElement,
  onFile: (file: File) => void | Promise<void>,
): void {
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) void onFile(f);
  });
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add(DRAG_RING);
  });
  dropzone.addEventListener('dragleave', () =>
    dropzone.classList.remove(DRAG_RING),
  );
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove(DRAG_RING);
    const f = e.dataTransfer?.files?.[0];
    if (f) void onFile(f);
  });
}

export async function fileToImageData(file: File): Promise<ImageData> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('无法创建 canvas 上下文');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function drawImageData(canvas: HTMLCanvasElement, img: ImageData): void {
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法创建 canvas 上下文');
  ctx.putImageData(img, 0, 0);
}
