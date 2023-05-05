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
    },
  },
  plugins: [],
}
