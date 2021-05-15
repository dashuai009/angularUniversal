# AngularUniversal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## 参考链接

[angular universal](https://angular.cn/guide/universal)
[Angular Universal: a Complete Practical Guide](https://blog.angular-university.io/angular-universal/)

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

![被修改的文件](src/assets/2021-05-15%2018-17-06%20的屏幕截图.png)

## 目标

打开一个article的时候
- 直接从服务器段拿到已经把md渲染为html
- 前端无需再去请求md文档

## 添加transferStateModule

[Here](https://angular.cn/api/platform-browser/TransferState)


angular提供了一种在服务器和浏览器之间，进行数据传输的一个接口。数据是附加在html后边中的一个script的标签中。

> 我踩的坑：这个数据自动进行json的解码转码。不要再对数据进行JSON.parse和JSON.stringify，无法处理html的标签，"<"

分别在app.server.module.ts和app.module.ts中，分别添加`ServerTransferStateModule`和`BrowserTransferStateModule`。

![server](src/assets/2021-05-15%2020-56-04%20的屏幕截图.png)

![browser](src/assets/2021-05-15%2020-56-20%20的屏幕截图.png)


## 编写resoler

在app.module.ts中声明（provider）resoler.ts模块。

之后，就可以在该文件中利用TransferState模块处理数据。

## 未解决的问题

- 解决了“在浏览器渲染markdown”的问题
- 后端每次刷新仍会请求一次github的ReadMe文档，这个比较慢
- 前端每次还会插入一边html
