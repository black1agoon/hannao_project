module.exports = {
    devServer: {
        port: 8006
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
    }
}