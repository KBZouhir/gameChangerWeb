// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: {
    preference: "light",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-snackbar",
    "@samk-dev/nuxt-vcalendar"
  ],

  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/svg/icons'
      },
    ],
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
  },

  plugins: [{ src: "~/plugins/vue-tags-input", mode: "client" }],

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
      googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
      apiKey: process.env.FIRE_APIKEY,
      authDomain: process.env.FIRE_AUTHDOMAIN,
      projectId: process.env.FIRE_PROJECTID,
      storageBucket: process.env.FIRE_STORAGEBUCKET,
      messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
      appId: process.env.FIRE_APPID,
      measurementId: process.env.FIRE_MEASUREMENTID,
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
      include: ["@sipec/vue3-tags-input"],
    },
    ssr: {
      noExternal: ["@sipec/vue3-tags-input"],
    },
  }
  
});