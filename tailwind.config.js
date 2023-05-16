/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss'), require('autoprefixer')],
    theme: {
        fontFamily: {
            IBM: ['"IBM Plex Sans"', 'sans-serif'],
        },
        extend: {
            corePlugins: {
                preflight: false,
            },
            colors: {
                primary: '#ce1111',
                c1: '#505050',
                c2: '#adadad',
            },
            animation: {
                fadeIn: 'fadeIn 1s linear',
                fadeInMes1: 'fadeInMes1 2s ease-in-out infinite',
                fadeInMes2: 'fadeInMes2 2s ease-in-out infinite',
                fadeInTips: 'fadeInTips 0.6s linear',
                fadeInSuccessPc: 'fadeInSuccessInPc .6s linear, fadeInSuccessOut 0.6s linear 5s forwards',
                fadeInSuccess: 'fadeInSuccessIn .6s linear, fadeInSuccessOut 0.6s linear 5s forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '.5', transform: 'scale(1.2)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                fadeInMes1: {
                    '0%': { opacity: '1', transform: 'scale(0)' },
                    '50%': { opacity: '.8', transform: 'scale(0.9)' },
                    '100%': { opacity: '.1', transform: 'scale(1.3)' },
                },
                fadeInMes2: {
                    '0%': { opacity: '1', transform: 'scale(0)' },
                    '50%': { opacity: '.7', transform: 'scale(0)' },
                    '100%': { opacity: '.3', transform: 'scale(1.3)' },
                },
                fadeInTips: {
                    '0%': { opacity: '0.6', transform: 'translateY(10%)' },
                    '100%': { opacity: '1', transform: 'translateY(-35%)' },
                },
                fadeInSuccessInPc: {
                    '0%': { opacity: '0', transform: 'translateX(80%)' },
                    '100%': { opacity: '1', transform: 'translateX(8%)' },
                },
                fadeInSuccessIn: {
                    '0%': { opacity: '0', transform: 'translateX(80%)' },
                    '100%': { opacity: '1', transform: 'translateX(4%)' },
                },
                fadeInSuccessOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
            dropShadow: {
                ShadowRoot: '0px 5px 6px rgba(0,0,0,0.2)',
            },
        },
    },
    plugins: [],
};
