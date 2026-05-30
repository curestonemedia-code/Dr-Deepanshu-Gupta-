/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // enable dark mode based on user OS preference
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2B5CE6', // main brand color
        secondary: '#14B8A6', // accent teal
        accent: '#F59E0B', // warm orange
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-colors-primary) , var(--tw-colors-secondary))',
      },
    },
  },
  plugins: [],
};
