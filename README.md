# demo-rss
###
RSS阅读器,纯前端,本地储存,rss源很多会导致浏览器跨域请求不到,浏览器源跨域需要proxy代理,没有做优化,本地测试良好,xml中item转数组在utils的ready.js里面.

### 本地代理问题
本地初始化有"少数派"一个源,添加源只能添加 https://www.freebuf.com/feed ,https://www.freebuf.com/feed ,https://sspai.com/feed 三个,因为这三个我做了proxy代理,其他的没做会出现跨域问题,可以看一下我的vue.config,其他的解决跨域的方法还没想到,因为修改vue.config的proxy需要重启项目才有效,所以做的系统添加源实现proxy代理联动实现不了.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

