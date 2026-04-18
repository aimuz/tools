import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://wizgo.xyz',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-TW': 'zh-TW',
          en: 'en',
          ja: 'ja',
          ko: 'ko',
        },
      },
    }),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WizGo',
        short_name: 'WizGo',
        description: '免费在线工具箱：图片压缩、格式转换、JWT、时间戳等，本地处理不上传',
        theme_color: '#171717',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      },
    }),
  ],
  output: 'static',
  vite: {
    // Rollup can't bundle IIFE workers that dynamic-import the WASM glue chunk.
    worker: { format: 'es' },
  },
});
