const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        "/https://www.freebuf.com/feed": {
          target: "https://www.freebuf.com/feed",
          changeOrigin: true,
          pathRewrite:{
            '^/https://www.freebuf.com/feed':''
          }
        },
        "/https://hnrss.org/newest": {
          target: "https://hnrss.org/newest",
          changeOrigin: true,
          pathRewrite:{
            '^/https://hnrss.org/newest':''
          }
        },
        "/https://sspai.com/feed": {
          target: "https://sspai.com/feed",
          changeOrigin: true,
          pathRewrite:{
            '^/https://sspai.com/feed':''
          }
        },
    },
},
})
