export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en.js'
          },
          {
            code: 'it',
            name: 'Italiano',
            file: 'it.js'
          }
        ],
        lazy: true,
        defaultLocale: 'en',
        langDir: 'assets/locales/',
        strategy: 'no_prefix',
        vueI18n: {
          fallbackLocale: 'en',
          dateTimeFormats: {
            it: {
              short: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              },
              long: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric'
              }
            },
            en: {
              short: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              },
              long: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric'
              }
            }
          }
        }
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  server: {
    port: 8081
  },
  router: {
    linkActiveClass: 'is-active'
  }
}
