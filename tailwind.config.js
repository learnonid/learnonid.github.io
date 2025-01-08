/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}", "./assets/**/*.{html,js}", "./assets/js/auth/**/*.{html,js}", "./auth/*.{html,js}", "./admin/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#08C2FF",
        "main-blue-dark": "#006BFF",
        "main-blue-darker": "#003285",
      },
    },
  },
  plugins: [],
}

