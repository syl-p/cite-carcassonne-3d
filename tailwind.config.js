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
    extend: {
      colors: {
        primary: "#E9DDD1",
        accent: "",
        page: "#fdfcf5",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
