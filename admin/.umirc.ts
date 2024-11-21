import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  dva: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Grtblog 后台管理系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '文章',
      path: '/article',
      routes: [
        {
          name: '文章列表',
          path: '/article/list',
          component: './Article',
        },
        {
          name: '添加文章',
          path: '/article/add',
          component: './Article/AddArticle',
        },
        {
          name: '编辑文章',
          path: '/article/edit/:id',
          component: './Article/EditArticle',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      hideInMenu: true,
      menuRender: false,
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/captcha': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
});
