/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-surface)',
        dark: '#15171e',
        'dark-muted': '#2a2e3a',
        surface: '#ffffff',
        'surface-subtle': '#f6f7fa',
        border: '#e5e7eb',
        'border-dark': '#1f232e',
        primary: {
          DEFAULT: '#0c0d10',
          hover: '#242833',
        },
        accent: {
          DEFAULT: '#ea1919',
          hover: '#c91212',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          hover: '#20ba59',
          dark: '#128c7e',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ea1919',
        'text-main': '#0c0d10',
        'text-muted': '#64748b',
        'text-inverted': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
