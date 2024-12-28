/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1c1e',
        snow: '#e4e5e7',
        danger: '#c74d4d',
        warning: '#c4c07a',
      },
    },
  },
  plugins: [],
}
