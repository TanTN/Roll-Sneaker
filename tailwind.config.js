/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      IBM:['"IBM Plex Sans"','sans-serif']
    },
    extend: {
      corePlugins: {
        preflight: false,
      },
      colors: {
        primary: '#ce1111',
        c1:'#505050',
        c2:'#adadad'
      },
      animation: {
        fadeIn: 'fadeIn 1s linear'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '.5', transform:'scale(1.2)' },
          '100%': { opacity: '1', transform:'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
