/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          dark: '#070a12',
          card: '#0f172a',
          border: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
