/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medflux-form': '#A1DCE2',
        'medflux-button': '#1FB2C9',
        'primary-foreground': '#ffffff',
        'muted-foreground': '#71717a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

