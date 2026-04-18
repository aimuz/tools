import { useTranslations } from './index';
import type { Locale } from './config';
import { absoluteUrl } from './seo';
import { getQuickActions } from '../data/tools';
import type { QuickActionKey } from './schema';


const IMAGE_TOOL_IDS: QuickActionKey[] = [
  'png-compress', 'jpg-compress', 'webp-compress',
  'png-to-jpg', 'jpg-to-png', 'png-to-webp', 'jpg-to-webp', 'webp-to-png', 'webp-to-jpg',
  'any-convert', 'any-compress', 'watermark', 'text-watermark',
];

const DEV_TOOL_IDS: QuickActionKey[] = [
  'jwt', 'timestamp', 'json', 'base64', 'uuid', 'url-encode', 'color', 'qrcode', 'code-image',
];

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

  return `# ${t.common.siteName}

> ${t.common.siteTagline}

## ${t.toolCategories.image.name}
${imageItems}

## ${t.toolCategories.code.name}
${devItems}

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
    'png-compress': 'Uses imagequant palette quantization (Rust WASM). Screenshots/icons typically shrink 60-80%, photos 20-30%, virtually no visible quality loss.',
    'jpg-compress': 'Files typically shrink 30-45%. Automatically strips EXIF metadata (location, device model) for privacy.',
    'webp-compress': 'Lossless WebP optimization. Returns the original file if it is already optimal — guarantees the smallest available output.',
    jwt: 'Decode/sign/verify JWT with HS256/384/512, RS256/384/512, ES256/384. Uses browser-native WebCrypto, zero third-party dependencies.',
    watermark: 'Two algorithms: LSB (high capacity) + DCT (survives JPG re-compression). Embeds invisible text into pixel data.',
    'text-watermark': 'Adds visible "for X use only" text watermark. Tile / center / corner layouts. Used for ID cards, contracts, ICP filings.',
  };

  const allIds = [...IMAGE_TOOL_IDS, ...DEV_TOOL_IDS];
  const blocks = allIds.map((id) => renderToolBlock(id, formatNotes[id])).join('');

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
