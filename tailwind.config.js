/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xxs: '410px',
        xs: '510px',
      },
      colors: {
        paper: token('paper'),
        surface: token('surface'),
        sunken: token('sunken'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        plum: { DEFAULT: token('plum'), ink: token('plum-ink'), soft: token('plum-soft'), deep: token('plum-deep') },
        coral: { DEFAULT: token('coral'), soft: token('coral-soft') },
        danger: token('danger'),
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        // The arched-window mask: a full semicircle on top, gently rounded at the base.
        arch: '999px 999px 1.25rem 1.25rem',
      },
      boxShadow: {
        lift: '0 1px 2px rgb(var(--shadow) / 0.05), 0 14px 34px -16px rgb(var(--shadow) / 0.28)',
        pop: '0 30px 70px -24px rgb(var(--shadow) / 0.5)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        shimmer: 'shimmer 1.4s infinite',
      },
    },
  },
  plugins: [],
};
