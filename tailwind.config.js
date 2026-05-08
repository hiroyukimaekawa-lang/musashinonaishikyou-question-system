/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // やさしいブルー
          light: '#EBF5FF',
          dark: '#2563EB',
        },
        surface: '#FFFFFF',
        background: '#F8FAFC',
        text: {
          DEFAULT: '#1E293B',
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
