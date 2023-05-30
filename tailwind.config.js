/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          default: '#535353',
          50: '#F8F8F8',
          100: '#DBDBDB',
          200: '#ACACAC',
          300: '#7B7B7B',
          400: '#535353',
          500: '#3C3C3C',
        },
        black: '#000',
        blue: {
          500: '#426BFF',
        },
        yellow: {
          50: '#FFFFF5',
          500: '#D5CC02',
        },
        orange: {
          500: '#FF6F42',
        },
        red: {
          500: '#DF0000',
        },
        green: {
          500: '#00910E',
        },
        purple: {
          500: '#A259FF',
        },
        sky: {
          500: '#1ABCFE',
        },
        pink: {
          500: '#FF49B6',
        },
      },
      fontFamily: {
        sans: ['Inter'],
        gothic: ['Zen Kaku Gothic New'],
      },
    },
  },
  plugins: [],
}
