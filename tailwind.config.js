/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E969E', // 落ち着いたティールカラー
          light: '#F2F7F7',
          dark: '#4A7A81',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
        accent: '#D1E5E7',
        text: {
          DEFAULT: '#334155',
          muted: '#64748B',
        },
        error: '#EF4444',
      },
      fontFamily: {
        noto: ['NotoSansJP'],
      },
    },
  },
  plugins: [],
};
