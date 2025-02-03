# 前端配置

::: tip
本项目使用的 Node.js 版本为 20
:::

:::warning
本项目使用的 Next.js 版本为 15，这是一个近期发布的版本，请查看 [Next.js 官方文档](https://nextjs.org/docs)。
因为这一原因，使用过程中可能会遇到一些问题，欢迎提交 issue 或 PR。
:::

## 简单叙述

前端部分使用的是 Next.js 框架，需要从源码构建，只需按照以下部分进行操作：

## 构建

首先进入项目目录，将 `.env.production` 文件中的配置修改为你的配置

```shell
NEXT_PUBLIC_BASE_URL=https://your_deplot_site/api/v1
NEXT_PUBLIC_SOCKET_IO_URL=https://your_deplot_site/socket.io
```

然后执行以下命令：

```shell
❯ npm install
❯ npm run build
```

## 运行

这个项目使用的是 PM2 来管理进程，你可以使用以下命令来启动项目：

```shell
❯ pm2 start ecosystem.config.js
```

## 完成

这样，你的前端就已经部署完成了。不出意外的话，你现在可以访问你的部署地址了。你将会看到一个示例文章，以及一些初始化的数据。

不过，现在的站点内容还是示例内容，让我们共同完成管理端，然后完成部署吧！
