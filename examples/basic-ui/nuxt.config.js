export default {
    head: {
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Open+Sans:400,700|Ubuntu:400,500&display=swap'
            }
        ]
    },

    modules: [
        // ...
        '@nuxtjs/axios',
        '@awes-io/ui/nuxt',
        // other @awes-io modules, which add custom routes should go before nuxt-i18n
        'nuxt-i18n'
    ],

    // add page default transition (if needed)
    pageTransition: {
        name: 'fade',
        mode: 'out-in'
    },

    // add nuxt-i18n basic config
    i18n: {
        vueI18n: {
            // `@awes-io/ui` will register lang strings under `en` locale
            fallbackLocale: 'en'
        },
        locales: [{ code: 'en', iso: 'en-US' }],
        defaultLocale: 'en'
    }
}