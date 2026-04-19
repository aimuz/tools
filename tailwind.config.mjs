/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'vercel-black': '#171717',
        'vercel-white': '#ffffff',
        'ship-red': '#ff5b4f',
        'preview-pink': '#de1d8d',
        'develop-blue': '#0a72ef',
        'console-blue': '#0070f3',
        'console-purple': '#7928ca',
        'link-blue': '#0072f5',
        'focus-blue': 'hsla(212, 100%, 48%, 1)',
        'badge-blue-bg': '#ebf5ff',
        'badge-blue-text': '#0068d6',
        gray: {
          50: '#fafafa',
          100: '#ebebeb',
          200: '#e5e5e5',
          400: '#808080',
          500: '#666666',
          600: '#4d4d4d',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tight-2.88': '-2.88px',
        'tight-2.4': '-2.4px',
        'tight-1.28': '-1.28px',
        'tight-0.96': '-0.96px',
        'tight-0.32': '-0.32px',
      },
      boxShadow: {
        border: '0px 0px 0px 1px rgba(0,0,0,0.08)',
        'border-light': 'rgb(235,235,235) 0px 0px 0px 1px',
        subtle: 'rgba(0,0,0,0.04) 0px 2px 2px',
        card: 'rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px, rgba(0,0,0,0.04) 0px 8px 8px -8px, #fafafa 0px 0px 0px 1px',
        focus: '0 0 0 2px hsla(212, 100%, 48%, 1)',
      },
      borderRadius: {
        micro: '2px',
        subtle: '4px',
        standard: '6px',
        comfortable: '8px',
        image: '12px',
        pill: '9999px',
      },
      lineHeight: {
        tight: '1.00',
        snug: '1.17',
        display: '1.20',
        heading: '1.25',
        card: '1.33',
        'body-relaxed': '1.80',
        body: '1.56',
        ui: '1.50',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
