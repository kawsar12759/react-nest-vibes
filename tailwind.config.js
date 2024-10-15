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
        'xs': '510px',
      },
    },
  },
  plugins: [require('daisyui'),],
}

