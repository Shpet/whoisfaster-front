// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  },

  css: ['@/assets/styles/base.scss'],

  modules: ['@nuxtjs/eslint-module']
})

