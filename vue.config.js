module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
  ],

  configureWebpack: {
    devtool: 'source-map',
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
