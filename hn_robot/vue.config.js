module.exports = {
  devServer: {
    port: 8057,
    // proxy: 'http://192.168.2.140:13808/'
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
  publicPath: '',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '盘点机器人'
        return args
      })
  }
}