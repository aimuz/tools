import { useTranslations } from '../i18n';
import { DEFAULT_LOCALE, type Locale } from '../i18n/config';
import { localizedPath } from '../i18n/seo';
import type { CategoryKey, CategoryToolKey, QuickActionKey } from '../i18n/schema';

export interface QuickAction {
  id: QuickActionKey;
  name: string;
  description: string;
  href: string;
  tags: string[];
  isNew?: boolean;
}

export interface Tool {
  id: CategoryToolKey;
  name: string;
  description: string;
  href: string;
  category: CategoryKey;
  isNew?: boolean;
}

export interface ToolCategory {
  id: CategoryKey;
  name: string;
  description: string;
  tools: Tool[];
}

type QuickActionMeta = {
  id: QuickActionKey;
  href: string;
  isNew?: boolean;
};

const QUICK_ACTION_ORDER: QuickActionMeta[] = [
  { id: 'png-compress', href: '/compress-png' },
  { id: 'jpg-compress', href: '/compress-jpg' },
  { id: 'webp-compress', href: '/compress-webp' },
  { id: 'png-to-jpg', href: '/png-to-jpg' },
  { id: 'jpg-to-png', href: '/jpg-to-png' },
  { id: 'png-to-webp', href: '/png-to-webp' },
  { id: 'jpg-to-webp', href: '/jpg-to-webp' },
  { id: 'webp-to-png', href: '/webp-to-png' },
  { id: 'webp-to-jpg', href: '/webp-to-jpg' },
  { id: 'code-image', href: '/code-image', isNew: true },
  { id: 'jwt', href: '/jwt', isNew: true },
  { id: 'timestamp', href: '/timestamp', isNew: true },
  { id: 'json', href: '/json' },
  { id: 'base64', href: '/base64', isNew: true },
  { id: 'uuid', href: '/uuid', isNew: true },
  { id: 'url-encode', href: '/url-encode', isNew: true },
  { id: 'color', href: '/color', isNew: true },
  { id: 'qrcode', href: '/qrcode', isNew: true },
  { id: 'hash', href: '/hash', isNew: true },
  { id: 'any-convert', href: '/convert' },
  { id: 'any-compress', href: '/compress' },
  { id: 'watermark', href: '/watermark', isNew: true },
  { id: 'text-watermark', href: '/text-watermark', isNew: true },
  { id: 'mp4-to-mp3', href: '/mp4-to-mp3', isNew: true },
];

type CategoryToolMeta = {
  id: CategoryToolKey;
  href: string;
  isNew?: boolean;
};

const CATEGORY_ORDER: { id: CategoryKey; tools: CategoryToolMeta[] }[] = [
  {
    id: 'image',
    tools: [
      { id: 'compress', href: '/compress' },
      { id: 'convert', href: '/convert' },
      { id: 'watermark', href: '/watermark', isNew: true },
      { id: 'text-watermark', href: '/text-watermark', isNew: true },
    ],
  },
  {
    id: 'code',
    tools: [
      { id: 'code-image', href: '/code-image', isNew: true },
      { id: 'json', href: '/json' },
      { id: 'jwt', href: '/jwt', isNew: true },
      { id: 'timestamp', href: '/timestamp', isNew: true },
      { id: 'base64', href: '/base64', isNew: true },
      { id: 'uuid', href: '/uuid', isNew: true },
      { id: 'url-encode', href: '/url-encode', isNew: true },
      { id: 'color', href: '/color', isNew: true },
      { id: 'qrcode', href: '/qrcode', isNew: true },
      { id: 'hash', href: '/hash', isNew: true },
    ],
  },
  {
    id: 'media',
    tools: [
      { id: 'mp4-to-mp3', href: '/mp4-to-mp3', isNew: true },
    ],
  },
];

export function getQuickActions(locale: Locale = DEFAULT_LOCALE): QuickAction[] {
  const t = useTranslations(locale);
  return QUICK_ACTION_ORDER.map((meta) => {
    const entry = t.quickActions[meta.id];
    return {
      id: meta.id,
      name: entry.name,
      description: entry.description,
      href: localizedPath(locale, meta.href),
      tags: entry.tags,
      ...(meta.isNew ? { isNew: true } : {}),
    };
  });
}

export function getToolCategories(locale: Locale = DEFAULT_LOCALE): ToolCategory[] {
  const t = useTranslations(locale);
  return CATEGORY_ORDER.map((cat) => {
    const catEntry = t.toolCategories[cat.id];
    return {
      id: cat.id,
      name: catEntry.name,
      description: catEntry.description,
      tools: cat.tools
        .map((toolMeta): Tool | null => {
          const toolEntry = catEntry.tools[toolMeta.id];
          if (!toolEntry) return null;
          return {
            id: toolMeta.id,
            name: toolEntry.name,
            description: toolEntry.description,
            href: localizedPath(locale, toolMeta.href),
            category: cat.id,
            ...(toolMeta.isNew ? { isNew: true } : {}),
          };
        })
        .filter((x): x is Tool => x !== null),
    };
  });
}

export function getAllTools(locale: Locale = DEFAULT_LOCALE): Tool[] {
  return getToolCategories(locale).flatMap((cat) => cat.tools);
}

export function getToolById(id: CategoryToolKey, locale: Locale = DEFAULT_LOCALE): Tool | undefined {
  return getAllTools(locale).find((tool) => tool.id === id);
}

export function getToolsByCategory(
  categoryId: CategoryKey,
  locale: Locale = DEFAULT_LOCALE,
): Tool[] {
  const category = getToolCategories(locale).find((cat) => cat.id === categoryId);
  return category?.tools ?? [];
}

export function searchQuickActions(
  query: string,
  locale: Locale = DEFAULT_LOCALE,
): QuickAction[] {
  const lowerQuery = query.toLowerCase();
  return getQuickActions(locale).filter(
    (action) =>
      action.name.toLowerCase().includes(lowerQuery) ||
      action.description.toLowerCase().includes(lowerQuery) ||
      action.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
