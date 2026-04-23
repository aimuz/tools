import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://wizgo.xyz',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-TW': 'zh-TW',
          en: 'en',
          ja: 'ja',
          ko: 'ko',
          es: 'es',
        },
      },
    }),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WizGo',
        short_name: 'WizGo',
        description:
          '免费在线工具箱：图片压缩、格式转换、JWT、时间戳等，本地处理不上传',
        theme_color: '#171717',
        background_color: '#ffffff',
        display: 'standalone',
        display_override: ['standalone', 'browser'],
        start_url: '/',
        id: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      },
    }),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    // Rollup can't bundle IIFE workers that dynamic-import the WASM glue chunk.
    worker: { format: 'es' },
  },
});
