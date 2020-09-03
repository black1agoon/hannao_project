const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    devServer: {
        port: 8088
    },
    productionSourceMap: false,
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
          // new CopyWebpackPlugin([
          //   // {
          //   //   from: path.resolve(__dirname, '../static'),
          //   //   to: 'static',
          //   //   ignore: ['.*']
          //   // },
          //   {
          //     from: path.resolve(__dirname, './src/assets'),
          //     to: 'static'
          //   }
          // ])
        ]
    }
}