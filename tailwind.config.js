/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxWidth: {
      'card': '300px'
    },
    extend: {
      fontFamily: {
        'card': ['Space Grotesk', 'sans-serif']
      },
      gridTemplateRows: {
        'mobile': '240px 60px auto'
      },
      colors: {
        'light-grayish-violet': 'hsl(270, 3%, 87%)',
        'dark-grayish-violet': 'hsl(279, 6%, 55%)',
        'very-dark-violet': 'hsl(278, 68%, 11%)',
        'error-red': 'hsl(0, 100%, 66%)',
      }
    },
  },
  plugins: [],
}