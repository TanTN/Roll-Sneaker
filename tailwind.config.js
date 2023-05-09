/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
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
      },
      dropShadow : {
        'ShadowRoot':'0px 5px 6px rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
}
