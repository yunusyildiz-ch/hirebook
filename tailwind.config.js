/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        trabzonBlue: '#38b6ff',
        trabzonBordo: '#8A1538',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  safelist: [
    "group-hover:opacity-100",
    "opacity-0",
    "opacity-100",
    "z-10",
    "z-50",
    "z-[999]",
    "left-full",
    "ml-2",
    "top-1/2",
    "-translate-y-1/2",
  ],
  plugins: [require('@tailwindcss/typography')],
}