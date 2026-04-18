import type { Translations } from './schema';
import { DEFAULT_LOCALE, type Locale } from './config';
import { zhCN } from './locales/zh-CN';
import { en } from './locales/en';

const TABLES: Record<Locale, Translations> = {
  'zh-CN': zhCN,
  en,
};

export function useTranslations(locale: Locale = DEFAULT_LOCALE): Translations {
  return TABLES[locale];
}

export function getLocaleFromParams(params: Record<string, string | undefined>): Locale {
  const raw = params.locale;
  if (raw && raw in TABLES) return raw as Locale;
  return DEFAULT_LOCALE;
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    return v === undefined ? '' : String(v);
  });
}

export type { Translations };
export { DEFAULT_LOCALE, type Locale } from './config';
