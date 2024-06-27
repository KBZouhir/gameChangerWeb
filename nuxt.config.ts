// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: {
    preference: 'light'
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt"],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  runtimeConfig: {
    public: {
      googleMapsApiKey: 'AIzaSyCGknJpFjo7lwAIMDBruZgT56TdZYGotnA',
    }
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
})