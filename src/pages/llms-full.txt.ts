import type { APIRoute } from 'astro';
import { buildLlmsFullTxt } from '../i18n/llmsTxt';

export const GET: APIRoute = () => {
  return new Response(buildLlmsFullTxt('zh-CN'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
