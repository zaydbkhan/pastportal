/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.js',
    './src/**/*.{html,js,ts,jsx,tsx}', // Add your source files here
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff7f50', // Example of adding a custom color
        secondary: '#8a2be2', // Another custom color
      },
      spacing: {
        18: '4.5rem', // Custom spacing utility
        72: '18rem', // Example of a custom spacing
      },
      fontSize: {
        xxl: '2.5rem', // Example of a custom font size
      },
      fontFamily: {
        body: ['"Roboto"', 'sans-serif'], // Custom font family
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom box shadow
      },
    },
  },
  plugins: [],
}
