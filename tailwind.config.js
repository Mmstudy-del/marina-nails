/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'marina-dark': '#000000',
        'marina-pink': '#FF69B4',
        'marina-light': '#FFB6D9',
        'marina-pale': '#FFF0F5',
      },
    },
  },
  plugins: [],
}
