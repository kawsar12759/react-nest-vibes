/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'false',
  theme: {
    extend: {
      screens: {
        'xxs': '410px',
        'xs': '510px',
        
      },
    },
  },
  plugins: [require('daisyui'),],
}

