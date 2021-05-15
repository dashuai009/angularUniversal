# AngularUniversal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## 参考链接

![angular universal](https://angular.cn/guide/universal)
![Angular Universal: a Complete Practical Guide](https://blog.angular-university.io/angular-universal/)

## 添加angular universal

`ng add @nguniversal/express-engine`

该命令会创建如下文件夹结构。


```
src/
  index.html                 app web page
  main.ts                    bootstrapper for client app
  main.server.ts             * bootstrapper for server app
  style.css                  styles for the app
  app/ ...                   application code
    app.server.module.ts     * server-side application module
server.ts                    * express web server
tsconfig.json                TypeScript base configuration
tsconfig.app.json            TypeScript browser application configuration
tsconfig.server.json         TypeScript server application configuration
tsconfig.spec.json           TypeScript tests configuration
```
## 目标

打开一个article的时候
- 直接从服务器段拿到已经把md渲染为html
- 前端无需再去请求md文档