// Copy an image blob to the system clipboard.
//
// Browser support for ClipboardItem is uneven: Chromium accepts most image/*
// blobs; Firefox and Safari effectively only guarantee image/png. Strategy:
// try the native mime first, then transcode to PNG and retry (unless the
// source is already PNG, in which case the failure is final).

export type ClipboardLabels = {
  notSupported?: string;
  canvasError?: string;
  pngFailed?: string;
  copying?: string;
  copied?: string;
  copyFailed?: string;
};

const DEFAULT_LABELS: Required<ClipboardLabels> = {
  notSupported: 'Clipboard API is not supported in this browser',
  canvasError: 'Failed to create canvas context',
  pngFailed: 'PNG generation failed',
  copying: 'Copying...',
  copied: 'Copied',
  copyFailed: 'Copy failed',
};

let activeLabels: Required<ClipboardLabels> = { ...DEFAULT_LABELS };

/** Override default labels (English fallbacks) for the current page. */
export function setClipboardLabels(labels: ClipboardLabels): void {
  activeLabels = { ...DEFAULT_LABELS, ...labels };
}

export async function copyImageToClipboard(blob: Blob, mime: string): Promise<void> {
  if (!('clipboard' in navigator) || !('ClipboardItem' in window)) {
    throw new Error(activeLabels.notSupported);
  }

  const write = (b: Blob, type: string) =>
    navigator.clipboard.write([new ClipboardItem({ [type]: b })]);

  try {
    await write(blob, mime);
    return;
  } catch (nativeErr) {
    if (mime === 'image/png') throw nativeErr;
  }

  const png = await transcodeToPng(blob);
  await write(png, 'image/png');
}

async function transcodeToPng(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error(activeLabels.canvasError);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();
  return canvasToPngBlob(canvas);
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(activeLabels.pngFailed))), 'image/png');
  });
}

/**
 * Wire up a button that, when clicked, copies an image to the clipboard.
 * `source()` may return a Blob or a Promise of one (useful when the blob is
 * produced lazily, e.g. from a canvas). Button text cycles through
 * copying → copied / failed → idle (1500 ms).
 */
export function bindCopyButton(
  btn: HTMLButtonElement,
  source: () => { blob: Blob | Promise<Blob>; mime: string },
): void {
  btn.addEventListener('click', async () => {
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = activeLabels.copying;
    try {
      const { blob, mime } = source();
      await copyImageToClipboard(await blob, mime);
      btn.textContent = activeLabels.copied;
    } catch (e) {
      btn.textContent = activeLabels.copyFailed;
      console.error(e);
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 1500);
  });
}
