/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F359B",
        title: "#26303E",
        subtitle: "#5C6672",
        border: "#D8D9DD",
      },
      fontFamily: {
        primaryFont: ['"Poppins", sans-serif'],
        secondaryFont: ['"Roboto", sans-serif'],
      },
    },
  },
  plugins: [],
};
