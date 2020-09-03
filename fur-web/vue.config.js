process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  devServer: {
    proxy: {
      '^/(?!(web|app|login))': {
        target: 'http://192.168.2.140:13801/',
      },
    },
    port: 8023,
  },
  assetsDir: 'static',
  publicPath: '/web/',
}
