/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan': {
          400: '#00ffff',
          500: '#00e6e6',
          600: '#00cccc',
        },
        'gray': {
          700: '#4a4a4a',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
} 