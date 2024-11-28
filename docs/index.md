---
layout: home

hero:
  name: "Grtblog"
  text: "个人博客站点的\n一站式优雅解决方案"
  tagline: 一个美观，扩展性强，快速部署的博客框架
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: alt
      text: API 文档
      link: /api-examples
  image: /assets/logo.png

features:
  - title: 简单易用（计划开发）
    details: 无需编写代码，几分钟内通过自动化安装程序和配置向导即可完成博客站点的部署
  - title: 美观简洁
    details: 采用现代化设计风格，加之灵动的动画效果，简洁的排版，让您的博客焕然一新
  - title: SEO 友好
    details: 使用 Next.js 框架，支持静态生成与增量静态再生，保留了所有的 SEO 优势
  - title: 强大扩展（计划开发）
    details: 通过插件系统，您可以轻松扩展 Grtblog 的功能，满足您的个性化需求
---

<style>

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #2052ff 30%, rgba(185,90,255,0.9));

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
