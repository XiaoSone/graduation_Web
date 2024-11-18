const { defineConfig } = require('@vue/cli-service');
// const webpack = require('webpack');
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,

    devServer: {
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                ws: false
            },
        },
        webSocketServer: false
    }
})