// Copy an image blob to the system clipboard.
//
// Browser support for ClipboardItem is uneven: Chromium accepts most image/*
// blobs; Firefox and Safari effectively only guarantee image/png. Strategy:
// try the native mime first, then transcode to PNG and retry (unless the
// source is already PNG, in which case the failure is final).

export async function copyImageToClipboard(blob: Blob, mime: string): Promise<void> {
  if (!('clipboard' in navigator) || !('ClipboardItem' in window)) {
    throw new Error('当前浏览器不支持剪贴板 API');
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
  if (!ctx) throw new Error('无法创建 canvas 上下文');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();
  return canvasToPngBlob(canvas);
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG 生成失败'))), 'image/png');
  });
}

/**
 * Wire up a button that, when clicked, copies an image to the clipboard.
 * `source()` may return a Blob or a Promise of one (useful when the blob is
 * produced lazily, e.g. from a canvas). The button cycles through:
 * idle → 复制中... → 已复制 / 复制失败 → idle (1500 ms).
 */
export function bindCopyButton(
  btn: HTMLButtonElement,
  source: () => { blob: Blob | Promise<Blob>; mime: string },
): void {
  btn.addEventListener('click', async () => {
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = '复制中...';
    try {
      const { blob, mime } = source();
      await copyImageToClipboard(await blob, mime);
      btn.textContent = '已复制';
    } catch (e) {
      btn.textContent = '复制失败';
      console.error(e);
    }
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 1500);
  });
}
