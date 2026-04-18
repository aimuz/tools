import type { APIRoute } from 'astro';
import { buildLlmsFullTxt } from '../../i18n/llmsTxt';
import { isLocale, type Locale } from '../../i18n/config';

export const getStaticPaths = () => [
  { params: { locale: 'en' } },
  { params: { locale: 'zh-TW' } },
  { params: { locale: 'ja' } },
  { params: { locale: 'ko' } },
];

export const GET: APIRoute = ({ params }) => {
  const raw = params.locale;
  if (!raw || !isLocale(raw)) {
    return new Response('Not Found', { status: 404 });
  }
  return new Response(buildLlmsFullTxt(raw as Locale), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
