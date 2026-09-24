/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DCFF',
          300: '#7AC0FF',
          400: '#389EFF',
          500: '#0C7EFF',
          600: '#0061D6',
          700: '#004CAE',
          800: '#03418E',
          900: '#093774',
          950: '#05234D',
        },
        slate: {
          850: '#151F32',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 10px 24px -3px rgba(15, 23, 42, 0.08)',
        'soft-glow': '0 0 20px -2px rgba(14, 116, 144, 0.12)',
      },
    },
  },
  plugins: [],
}
