const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const entries = ['app']
module.exports = {
    devServer: {
        port: 8003
        // proxy: 'http://192.168.2.187:9606/'
    },
    productionSourceMap: false,
    assetsDir: 'static',
    chainWebpack: (config) => {
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['static'],
            verbose: true,                          // 是否启用控制台输出信息
            dry: false,                              // 设置为false,启用删除文件
        })
      ],
      optimization: {
        splitChunks: {
          cacheGroups: Object.assign(
            {
              vendors: {
                name: 'vendors',
                test: /[\\\/]node_modules[\\\/]/,
                priority: 40,
                minChunks: 2,
                chunks: 'all'
              }
            },
            ...entries.map(entryName => {
              let chunkName = 'vendors-' + entryName
              return {
                [chunkName]: {
                  name: chunkName,
                  test: /[\\\/]node_modules[\\\/]/,
                  enforce: true,
                  priority: 10,
                  chunks: (chunk) => chunk.name === entryName
                },
              }
            })
          )
        }
      }
    },
    pages: {
      app: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        chunks: ['vendors', 'vendors-app', 'app']
      }
    }
}