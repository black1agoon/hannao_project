var webpack = require('webpack')
module.exports = {
    devServer: {
        port: 8034
    },
    assetsDir: 'static',
    chainWebpack(config) {
        config.plugin('define').tap(args => {
            return [
                {
                    TITLE: JSON.stringify(process.env.TITLE)
                }
            ];
        });
    },
    configureWebpack: {
      plugins: [
       new webpack.ProvidePlugin({
         jQuery: 'jquery',
         $: 'jquery'
       })
      ]
    }
}