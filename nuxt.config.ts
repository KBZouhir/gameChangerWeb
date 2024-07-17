// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: {
    preference: "light",
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt", "nuxt-snackbar"],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },



  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            "blue-zodiac": {
              DEFAULT: "#0F1454",
              50: "#3E4ADD",
              100: "#2D39D9",
              200: "#222DBC",
              300: "#1B2499",
              400: "#151C77",
              500: "#0F1454",
              600: "#070924",
              700: "#000000",
              800: "#000000",
              900: "#000000",
              950: "#000000",
            },
          },
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      googleMapsApiKey: "AIzaSyCGknJpFjo7lwAIMDBruZgT56TdZYGotnA",
    },
  },

  i18n: {
    locales: [
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },

  vite: {
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    },
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Access-Control-Allow-Origin": "*",
      },
    },
  },
});
