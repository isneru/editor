/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          100: "#363636",
          200: "#2e2e2e",
          300: "#282828",
          500: "#262626",
          700: "#232323",
          800: "#1c1c1c",
          900: "#161616"
        },
        accent: {
          500: "#987ef1"
        },
        text: {
          400: "#ededed",
          500: "#dadada",
          600: "#bababa"
        }
      }
    }
  },
  plugins: []
}
