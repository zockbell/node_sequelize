module.exports = {
    publicPath:'/node_app/',
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',        // 设置主机地址
        port: 9080,             // 设置默认端口
        open: true,             // 启动项目自动打开浏览器
        proxy: {                // 设置代理
            '/api/': {
                target: 'http://localhost:3000/',   // 设置你调用的接口域名
                ws: true,                               // 是否要代理 websockets
                secure: false,                          // 如果是https接口，需要配置这个参数
                changeOrigin: true,                     // 是否跨域
                pathRewrite: {
                    '^/api': '/'                        // 这里可以理解为用'/api'来代替target里面的地址，例如我们调用https://api.github.com/static/textbook/audio_res.json，直接写成'/api/static/textbook/audio_res.json'
                }
            }
        }
    }
}