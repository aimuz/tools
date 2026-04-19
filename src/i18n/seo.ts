import { LOCALES, DEFAULT_LOCALE, OG_LOCALES, type Locale } from './config';

const SITE_ORIGIN = 'https://wizgo.xyz';

export function localizedPath(locale: Locale, pathname: string): string {
  const cleaned = pathname.replace(/^\/+/, '').replace(/\/$/, '');
  const stripped = stripLocaleFromPath(cleaned);
  if (locale === DEFAULT_LOCALE) {
    return stripped ? `/${stripped}` : '/';
  }
  return stripped ? `/${locale}/${stripped}` : `/${locale}/`;
}

export function stripLocaleFromPath(pathname: string): string {
  const cleaned = pathname.replace(/^\/+/, '').replace(/\/$/, '');
  if (!cleaned) return '';
  const [head, ...rest] = cleaned.split('/');
  if (
    (LOCALES as readonly string[]).includes(head) &&
    head !== DEFAULT_LOCALE
  ) {
    return rest.join('/');
  }
  return cleaned;
}

export function absoluteUrl(
  locale: Locale,
  pathname: string,
  origin: string = SITE_ORIGIN,
): string {
  return `${origin.replace(/\/$/, '')}${localizedPath(locale, pathname)}`;
}

export type HreflangEntry = { hreflang: string; href: string };

export function buildHreflangEntries(
  pathname: string,
  origin: string = SITE_ORIGIN,
): HreflangEntry[] {
  const entries: HreflangEntry[] = LOCALES.map((locale) => ({
    hreflang: locale,
    href: absoluteUrl(locale, pathname, origin),
  }));
  entries.push({
    hreflang: 'x-default',
    href: absoluteUrl(DEFAULT_LOCALE, pathname, origin),
  });
  return entries;
}

export function ogLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

export function alternateOgLocales(current: Locale): string[] {
  return LOCALES.filter((l) => l !== current).map((l) => OG_LOCALES[l]);
}
