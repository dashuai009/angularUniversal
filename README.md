# AngularUniversal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## app.component

这里有几个链接，指向github上的一些readme文档

## service

该服务会请求这些readme文档

## article.component

该模块会进行md解析。文档解析是在前端解析的，浏览器处理dom，插入标签会非常的慢。

下图是我在本地（`ng s -o`）进行的测试，`Largest Contentful Paint`会非常慢。在正常服务器环境下，考虑到网速等问题，Performance得分会更低。

![示意图](src/assets/2021-05-15%2017-45-28%20的屏幕截图.png)