module.exports = {
  devServer: {
    port: 8044
  },
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack(config) {
    config.plugin('define').tap(args => {
      return [
        {
          TITLE: JSON.stringify(process.env.TITLE)
        }
      ];
    });
  }
}