/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./Views/**/*.cshtml",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colours
        'pokemon-yellow': '#f6d704',
        'pokemon-red': '#f83e15',
        'timely-pink': '#FFE4F7',
        'timely-purple': '#4F4DB0',
        'timely-burgundy': '#7A264A',
      },
    },
  },
  plugins: [],
}

