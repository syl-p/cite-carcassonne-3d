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
    documentDriven: {
      injectPage: false,
    },
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

  vite: {},

  compatibilityDate: "2025-02-17",
});
