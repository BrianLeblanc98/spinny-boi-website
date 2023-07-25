// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Spinny Boi',
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  components: [
    { path: '~/components/modals' },
    '~/components',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
    ],
  },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-final-modal/style.css',
  ],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
    ],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_FIRE_BASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_FIRE_BASE_AUTH_DOMAIN,
      firebaseDatabaseURL: process.env.NUXT_FIRE_BASE_DATABASE_URL,
      firebaseProjectId: process.env.NUXT_FIRE_BASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_FIRE_BASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_FIRE_BASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_FIRE_BASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_FIRE_BASE_MEASUREMENT_ID,
    },
  },
})
