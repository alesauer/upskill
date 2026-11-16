// Tailwind CSS v3 config measured by DesignMD from https://universonarrado.com.br/cursos#trilha on 2026-11-16.
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // measured breakpoints replace the defaults
    screens: {
      'sm': '600px',
      'md': '640px',
      'lg': '800px',
      'xl': '960px',
    },
    extend: {
      colors: {
        'bg-canvas': '#ffffff', // Canvas
        'text-primary': '#1c3752', // Primary Text
        'text-secondary': '#4a6079', // Secondary Text
        'accent': '#03203d', // Brand Accent
        'bg-surface': '#0cf2b5', // Surface
        'gray-light': '#eaf0ff', // Gray Light
        'gray-light-2': '#f1ecff', // Gray Light 2
        'gray-light-3': '#f9f3e3', // Gray Light 3
        'gray-light-4': '#fff9d6', // Gray Light 4
        'gray-light-5': '#e3e7eb', // Gray Light 5
      },
      fontFamily: {
        display: ['Museo', 'ui-rounded', 'Segoe UI', 'system-ui', 'sans-serif'],
        body: ['Museo', 'ui-rounded', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['67px', { lineHeight: '1.04', letterSpacing: '-1.33px', fontWeight: '400' }],
        'heading-xl': ['64px', { lineHeight: '1.04', letterSpacing: '-1.79px', fontWeight: '900' }],
        'heading-lg': ['48px', { lineHeight: '1.08', letterSpacing: '-1.15px', fontWeight: '900' }],
        'heading': ['40px', { lineHeight: '1.08', letterSpacing: '-0.96px', fontWeight: '900' }],
        'heading-sm': ['22px', { lineHeight: '1.45', fontWeight: '300' }],
        'subheading': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
        'body': ['18px', { lineHeight: '1.45', fontWeight: '300' }],
        'small': ['15px', { lineHeight: '1.55', fontWeight: '300' }],
        'caption': ['13px', { lineHeight: '1.55', letterSpacing: '1.04px', fontWeight: '700' }],
      },
      borderRadius: {
        'sm': '12px', // button, card
        'md': '16px', // card
        'lg': '28px', // card
        full: '9999px',
      },
      boxShadow: {
        'sm': 'rgb(3, 32, 61) 4px 4px 0px 0px',
        'md': 'rgba(255, 255, 255, 0.9) 4px 4px 0px 0px',
      },
      maxWidth: { container: '1260px' },
      transitionDuration: {
        'fast': '150ms',
      },
      transitionTimingFunction: {
        'custom-1': 'ease',
      },
    },
  },
};
