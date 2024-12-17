/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#6020a0',
              foreground: '#000000'
            },
            focus: '#6020a0'
          }
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#6020a0',
              foreground: '#000000'
            },
            focus: '#6020a0',
            purple: {
              50: '#F2EAFA',
              100: '#E4D4F4',
              200: '#C9A9E9',
              300: '#AE7EDE',
              400: '#9353D3',
              500: '#7828C8',
              600: '#6020A0',
              700: '#481878',
              800: '#301050',
              900: '#180828'
            }
          }
        }
      }
    })
  ]
};
