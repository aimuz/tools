// Paste-to-upload helper shared by convert- and compress-page.
//
// Hooks into the global `paste` event so users can Cmd/Ctrl+V a screenshot
// directly onto any upload page — no save-to-disk round-trip. Ignores pastes
// targeting real form inputs (textareas / contenteditable / search boxes)
// so the rest of the page's paste UX isn't hijacked.

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = () => {
  const d = new Date();
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  );
};

function renameIfGeneric(f: File): File {
  // Browsers usually name clipboard images `image.png` or leave the name
  // blank. Give the user something recognizable on disk once they download.
  const generic =
    !f.name ||
    f.name === 'image.png' ||
    f.name === 'image.jpeg' ||
    f.name === 'image.webp';
  if (!generic) return f;
  const ext = (f.type.split('/')[1] || 'png').split(';')[0];
  return new File([f], `clipboard-${stamp()}.${ext}`, { type: f.type });
}

function isTypingTarget(el: EventTarget | null): boolean {
  const node = el as HTMLElement | null;
  if (!node) return false;
  if (node.isContentEditable) return true;
  const tag = node.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

/**
 * Install a document-level paste listener that extracts files from the
 * clipboard and forwards them to `onFiles`. Returns a disposer. Silently
 * no-ops on pastes that don't match `filter` or target an editable element
 * (so search boxes / text inputs still work). Defaults to image/*.
 */
export function installPasteHandler(
  onFiles: (files: File[]) => void,
  filter: (item: DataTransferItem) => boolean = (it) =>
    it.type.startsWith('image/'),
): () => void {
  const listener = (ev: ClipboardEvent) => {
    if (isTypingTarget(ev.target)) return;
    const items = ev.clipboardData?.items;
    if (!items) return;
    const files: File[] = [];
    for (const it of Array.from(items)) {
      if (it.kind !== 'file' || !filter(it)) continue;
      const f = it.getAsFile();
      if (!f) continue;
      files.push(it.type.startsWith('image/') ? renameIfGeneric(f) : f);
    }
    if (files.length === 0) return;
    ev.preventDefault();
    onFiles(files);
  };
  document.addEventListener('paste', listener);
  return () => document.removeEventListener('paste', listener);
}
