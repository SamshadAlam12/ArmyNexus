/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        army: {
          dark: 'var(--army-dark)',
          primary: 'var(--army-primary)',
          green: 'var(--army-green)',
          olive: 'var(--army-olive)',
          oliveLight: 'var(--army-oliveLight)',
          sand: 'var(--army-sand)',
          sandLight: 'var(--army-sandLight)',
        },
        surface: {
          dark: 'var(--surface-dark)',
          card: 'var(--surface-card)',
          cardHover: 'var(--surface-cardHover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      minWidth: {
        'screen-min': '320px',
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
}
