/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#4EC0E0',
        'background-color': '#F5F6FB',
        tableColor: '#4EC0E01C'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

