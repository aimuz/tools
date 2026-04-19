import type { APIRoute } from 'astro';
import { useTranslations } from '../../i18n';
import { isLocale, type Locale } from '../../i18n/config';

export const getStaticPaths = () => [
  { params: { locale: 'en' } },
  { params: { locale: 'zh-TW' } },
  { params: { locale: 'ja' } },
  { params: { locale: 'ko' } },
  { params: { locale: 'es' } },
];

export const GET: APIRoute = ({ params }) => {
  const raw = params.locale;
  if (!raw || !isLocale(raw)) {
    return new Response('Not Found', { status: 404 });
  }
  const locale = raw as Locale;
  const t = useTranslations(locale);

  const manifest = {
    name: t.manifest.name,
    short_name: t.manifest.shortName,
    description: t.manifest.description,
    theme_color: '#171717',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: `/${locale}/`,
    scope: `/${locale}/`,
    lang: locale,
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
