/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extends: {
      colors: {
        primary: colors.blue,
      },
    },
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace'],
    },
  },
  plugins: [require('tailwindcss-animate')],
}
