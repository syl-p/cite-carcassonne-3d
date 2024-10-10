/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      serif: ["ui-serif", "Times New Roman", "Times, serif"],
      spectral: ["Spectral", "ui-serif", "Times New Roman", "Times, serif"],
    },
    extend: {
      colors: {
        primary: "#E9DDD1",
        accent: "",
        page: "#fdfcf5",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
