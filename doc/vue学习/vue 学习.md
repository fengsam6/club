## vue 学习（待完善）

### 一、vue 简介

vue官网：https://cn.vuejs.org/v2/guide/。vue 一个MVVM 前端框架，支持页面视图和数据双向绑定。

### 二、vue 语法学习

vue语法学习，可以参考官网，可以阅读一些博客学习。

###  三 、vue cli搭建及启动项目

* 软件依赖。需要先安装node.js。（可以设置npm镜像为淘宝镜像，）
* 通过npm install -g vue-cli安装vue-cli （vue-cli 2.0和3.0，项目代码结构有区别）
* 使用vue-cli 搭建项目。vue init webpack project_name
* 使用npm  intsall ,会根据package.json文件下载依赖。
* 开发启动，npm run dev(具体可以package.json l里面配置)
 * 部署启动，npm run build(具体可以package.json l里面配置)

### 四、vue前后端分离跨域问题

 * vue开发时候，配置文件可以配置代理
 * 跨域问题可以由后端请求接口解决
 * 生产环境，可以使用ngixn反向代理解决跨域																																																								

