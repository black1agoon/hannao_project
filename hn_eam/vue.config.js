const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const entries = ['app', 'board']
module.exports = {
    devServer: {
        port: 8005
        // ,
        // proxy: 'http://ewbs.hnao.cn/eam'
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
        // new BundleAnalyzerPlugin(),
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
      },
      board: {
        entry: 'src/board/board.js',
        template: 'public/board.html',
        chunks: ['vendors', 'vendors-board', 'board']
      }
    }
}