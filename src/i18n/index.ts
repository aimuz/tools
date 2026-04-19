import type { Translations } from './schema';
import { DEFAULT_LOCALE, type Locale } from './config';
import { zhCN } from './locales/zh-CN';
import { zhTW } from './locales/zh-TW';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { es } from './locales/es';

const TABLES: Record<Locale, Translations> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en,
  ja,
  ko,
  es,
};

export function useTranslations(locale: Locale = DEFAULT_LOCALE): Translations {
  return TABLES[locale];
}

export function getLocaleFromParams(
  params: Record<string, string | undefined>,
): Locale {
  const raw = params.locale;
  if (raw && raw in TABLES) return raw as Locale;
  return DEFAULT_LOCALE;
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    return v === undefined ? '' : String(v);
  });
}

export type { Translations };
export { DEFAULT_LOCALE, type Locale } from './config';
