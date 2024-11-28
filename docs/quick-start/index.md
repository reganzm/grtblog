# 总述

::: warning
请注意，这个项目还在开发中，可能会有很多问题，随时欢迎提交 issue 或 PR。
:::

::: tip
**Feel free to contribute!**
:::

首先，这个项目是一个前后端分离项目，因此它的部署不同于 Wordpress、Typecho 等框架，而是要完成前后端分别部署。
其前端使用 Next.js，管理端采用的 Umi.js，后端采用 Spring Boot，推荐微服务使用 FastAPI，数据库采用 MySQL。

因此，要完成这个项目的部署，需要完成以下几个步骤：

1. 配置搜索与推荐服务
2. 启动后端
3. 完成 Nginx 反代配置
4. 启动前端
5. 启动管理端

别担心，这个项目我会持续维护与开发，下一步的开发计划是自动化初始化程序和配置向导，让你可以在几分钟内完成部署。

如果你来的比较早，或是正在试用技术预览版本（TP），只要跟着文档一步步操作就可以完成部署。

项目结构：
```shell
❯ tree -L 2
.
├── admin （管理端）
│   ├── mock
│   ├── node_modules
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── README.md
│   ├── src
│   ├── tsconfig.json
│   └── typings.d.ts
├── backend （后端）
│   ├── HELP.md
│   ├── logs
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── src
│   ├── target
│   └── uploads
├── bff （目前已弃用，将在需要时再考虑开发）
├── docs （文档）
│   ├── ...
├── frontend （前端）
│   ├── ecosystem.config.js
│   ├── next.config.mjs
│   ├── next-env.d.ts
│   ├── node_modules
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── src
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── LICENSE (MIT)
└── README.md 

20 directories, 28 files
```

本项目开源在 GitHub 上，欢迎提交 issue 或 PR。
地址:[Grtblog](https://github.com/grtsinry43/grtblog)

下面，我们开始部署这个项目。
