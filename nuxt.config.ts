// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
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
    "@samk-dev/nuxt-vcalendar",
    "nuxt-swiper",
    "dayjs-nuxt",
  ],

  // icon: {
  //   customCollections: [
  //     {
  //       prefix: "my-icon",
  //       dir: "./assets/svg/icons",
  //     },
  //   ],
  // },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  build: {
    transpile: [
      "@vuepic/vue-datepicker",
      "@fawmi/vue-google-maps",
      "@googlemaps/markerclusterer",
    ],
  },

  snackbar: {
    bottom: true,
    duration: 5000,
    success: '#34d198',
    error: '#FF5252',
    warning: '#FFC107',
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

  dayjs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "America/New_York",
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
      apiBaseUrl: process.env.API_BASE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    },
  },

  // nitro: {
  //   routeRules: {
  //     '/**': {
  //       headers: {
  //         'Cross-Origin-Opener-Policy': 'same-origin',
  //         'Cross-Origin-Embedder-Policy': 'require-corp',
  //       },
  //     },
  //   },
  // },
  i18n: {
    locales: [
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },

  compatibilityDate: "2024-08-29",
});