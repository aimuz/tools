import { useTranslations } from './index';
import type { Locale } from './config';
import { absoluteUrl } from './seo';
import { getQuickActions } from '../data/tools';
import type { QuickActionKey } from './schema';

const IMAGE_TOOL_IDS: QuickActionKey[] = [
  'png-compress',
  'jpg-compress',
  'webp-compress',
  'png-to-jpg',
  'jpg-to-png',
  'png-to-webp',
  'jpg-to-webp',
  'webp-to-png',
  'webp-to-jpg',
  'any-convert',
  'any-compress',
  'watermark',
  'text-watermark',
];

const DEV_TOOL_IDS: QuickActionKey[] = [
  'jwt',
  'timestamp',
  'json',
  'base64',
  'uuid',
  'url-encode',
  'color',
  'qrcode',
  'code-image',
];

const MEDIA_TOOL_IDS: QuickActionKey[] = ['mp4-to-mp3'];

const DOC_TOOL_IDS: QuickActionKey[] = ['pdf-compress', 'pdf-merge'];

export function buildLlmsTxt(locale: Locale): string {
  const t = useTranslations(locale);
  const actions = getQuickActions(locale);
  const byId = new Map(actions.map((a) => [a.id, a]));

  const renderItem = (id: QuickActionKey): string | null => {
    const a = byId.get(id);
    if (!a) return null;
    const url = `https://wizgo.xyz${a.href}`;
    return `- [${a.name}](${url}): ${a.description}`;
  };

  const imageItems = IMAGE_TOOL_IDS.map(renderItem).filter(Boolean).join('\n');
  const devItems = DEV_TOOL_IDS.map(renderItem).filter(Boolean).join('\n');
  const mediaItems = MEDIA_TOOL_IDS.map(renderItem).filter(Boolean).join('\n');
  const docItems = DOC_TOOL_IDS.map(renderItem).filter(Boolean).join('\n');

  return `# ${t.common.siteName}

> ${t.common.siteTagline}

## ${t.toolCategories.image.name}
${imageItems}

## ${t.toolCategories.code.name}
${devItems}

## ${t.toolCategories.media.name}
${mediaItems}

## ${t.toolCategories.document.name}
${docItems}

## ${t.pages.about.privacy.heading}
${t.pages.about.privacy.intro}
${t.pages.about.privacy.items.map((i) => `- ${i}`).join('\n')}

## Optional
- [${t.pages.about.h1}](${absoluteUrl(locale, '/about')})
`;
}

export function buildLlmsFullTxt(locale: Locale): string {
  const t = useTranslations(locale);
  const actions = getQuickActions(locale);
  const byId = new Map(actions.map((a) => [a.id, a]));

  const tagsLine = (id: QuickActionKey): string => {
    const a = byId.get(id);
    return a ? a.tags.join(', ') : '';
  };

  const renderToolBlock = (id: QuickActionKey, extra?: string): string => {
    const a = byId.get(id);
    if (!a) return '';
    const url = `https://wizgo.xyz${a.href}`;
    let block = `### ${a.name}\n\n${a.description}\n\n- URL: ${url}\n- Tags: ${tagsLine(id)}\n`;
    if (extra) block += `- Notes: ${extra}\n`;
    return block + '\n';
  };

  const formatNotes: Partial<Record<QuickActionKey, string>> = {
    'png-compress':
      'Uses imagequant palette quantization (Rust WASM). Screenshots/icons typically shrink 60-80%, photos 20-30%, virtually no visible quality loss.',
    'jpg-compress':
      'Files typically shrink 30-45%. Automatically strips EXIF metadata (location, device model) for privacy.',
    'webp-compress':
      'Lossless WebP optimization. Returns the original file if it is already optimal — guarantees the smallest available output.',
    jwt: 'Decode/sign/verify JWT with HS256/384/512, RS256/384/512, ES256/384. Uses browser-native WebCrypto, zero third-party dependencies.',
    watermark:
      'Two algorithms: LSB (high capacity) + DCT (survives JPG re-compression). Embeds invisible text into pixel data.',
    'text-watermark':
      'Adds visible "for X use only" text watermark. Tile / center / corner layouts. Used for ID cards, contracts, ICP filings.',
    'mp4-to-mp3':
      'Extracts audio from MP4/MOV/M4A/WebM and re-encodes as MP3 at 128/192/256/320 kbps. Decoding via Web Audio, encoding via JS lamejs — runs entirely in the browser, no uploads, single file up to 500 MB.',
    'pdf-compress':
      'Shrinks PDF file size by rewriting object streams and stripping metadata via pdf-lib. Typical savings 5–15% on already-optimized PDFs; image re-encoding is planned for V2 (projected 50–80%). Runs entirely in the browser — no uploads. Up to 200 MB per file.',
    'pdf-merge':
      'Combines multiple PDFs into a single document with up/down reordering. Uses pdf-lib in the browser — no uploads. Up to 200 MB per file; works best with fewer than 20 large files.',
  };

  const allIds = [
    ...IMAGE_TOOL_IDS,
    ...DEV_TOOL_IDS,
    ...MEDIA_TOOL_IDS,
    ...DOC_TOOL_IDS,
  ];
  const blocks = allIds
    .map((id) => renderToolBlock(id, formatNotes[id]))
    .join('');

  return `# ${t.common.siteName} — Full Tool Reference

> ${t.common.siteTagline}

## Overview

${t.pages.home.description}

## Privacy & Architecture

${t.pages.about.intro}

${t.pages.about.privacy.intro}
${t.pages.about.privacy.items.map((i) => `- ${i}`).join('\n')}

## Tools

${blocks}
## License & Source

${t.pages.about.credits.intro}
${t.pages.about.credits.items.map((it) => `- [${it.label}](${it.href}) — ${it.desc}`).join('\n')}
`;
}
