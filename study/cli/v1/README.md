# v1

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目的配置文件
package.json
scripts: 项目的启动方式 npm run serve 其中serve字段可以修改 比如 dev
dependencies: 项目必须要的环境
devDependencies： 项目的插件

### 这个文件不用管 删掉或者留着都可以
package-lock.jso

### babel的一些配置处理
babel.config.js

### 项目需要插件集合 不用上传git 编译时会自动拉去
node_modules 

### public
favicon.ico 网站的小图标title左边的哪个
index.html 项目入口文件

### src
assets 静态文件 js、css、image
components 组件
App.vue 跟组件
main.js 项目的入口文件