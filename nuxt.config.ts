// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@tresjs/nuxt",
    "@nuxt/content",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/ui",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    documentDriven: true,
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
  },
  nitro: {
    storage: {
      fs: {
        driver: "fs",
        base: "./public/uploads",
      },
    },
  },
  vite: {
    build: {
      minify: false, // Désactive la minification pour voir si ça aide
    },
    optimizeDeps: {
      disabled: true, // Désactive l'optimisation des dépendances
    },
  },
});
