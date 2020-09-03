module.exports = {
  devServer: {
    port: 8043,
    // proxy: {
    //   "/api": {  // 匹配/api开头的
    //     target: 'http://192.168.2.140:5008/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/api'
    //     }
    //   }
    // }
  },
  productionSourceMap: false,
  assetsDir: 'static',
  publicPath: ''
}