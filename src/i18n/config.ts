export const LOCALES = ['zh-CN', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'zh-CN';

export const LOCALE_LABELS: Record<Locale, string> = {
  'zh-CN': '中文',
  en: 'English',
};

export const OG_LOCALES: Record<Locale, string> = {
  'zh-CN': 'zh_CN',
  en: 'en_US',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
