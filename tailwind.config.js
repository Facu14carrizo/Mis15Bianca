/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-violet': '#4B0082',
        'dark-violet': '#2D004F',
        'silver': '#C0C0C0',
        'silver-bright': '#E5E5E5',
      }
    },
  },
  plugins: [],
};
