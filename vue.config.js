module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
        }
    },
    devServer: {
        port: 8080,
        // 设置代理
        proxy: {
            '/v2/*': {
                target: 'https://m.douban.com/rexxar/api',
                changeOrigin: true
            }
        },
    },
}