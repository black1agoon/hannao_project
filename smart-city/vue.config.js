module.exports = {
  devServer: {
    proxy: 'http://www.hnao.cn:9102/',
    port: 8092,
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
