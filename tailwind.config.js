/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'leafy-green': '#3D7546',
        'earth-brown': '#8B7355',
        'neutral-cream': '#F5F1E8',
      },
    },
  },
  plugins: [],
};
