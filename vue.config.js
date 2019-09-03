module.exports = {
  lintOnSave: false,
  publicPath : "./",
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/base': {
        target: 'http://106.75.137.205:8081/ai/api/base',
        // ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/base': ''
        }
      }
    },
    before: app => {}
  }
}