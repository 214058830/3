module.exports = {
    baseUrl: '/', // 跟路径
    outputDir: "dist", // 构建输出目录
    assertDir: "assets", // 静态资源目录(css、js、imag)
    lintOnSave: false, // 是否开启eslint有效检测 true || false || 'error'
    devServer: {
        open: true, // run serve 完自动打开网页
        host: "locahost", // 主机域名
        port: 8081,
        https: false,
        hotonly: false, // 热更新模块 但webpack已经含有这样功能
        proxy: {
            // 配置跨域请求
            '/api': {
                target: "http//localhost:5000/api",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};