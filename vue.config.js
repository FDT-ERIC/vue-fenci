module.exports = {
  lintOnSave: false,
  publicPath : "./",
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://106.75.137.205:8081/api/',
        // ws: true,
        changOrigin: true, // 跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
}