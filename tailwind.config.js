/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        main_100: "#D0E3FF",
        main_200: "#9BC3FF",
        main_300: "#8DBBFF",
        main_400: "#72ABFF",
        main_500: "#5499FF",
        main_600: "#227BFF",
      },
      textColor: {
        main: "#202226",
        sub: "#636473",
        placeholder: "#666666",
      },
    },
  },
  plugins: [],
}
