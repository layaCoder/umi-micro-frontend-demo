import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      // redirect: '/home',
      component: './Home',
    },
    // {
    //   name: '首页',
    //   path: '/home',
    //   component: './Home',
    // },
    // {
    //   name: '权限演示',
    //   path: '/access/microAppWithUrl',
    //   component: './Access',
    // },
    {
      name: '权限演示',
      // component: './Access',
      path: '/access',
      routes: [
        {
          name: '我是umi max react子应用权限示例',
          path: 'demo',
          component: './Access',
        },
      ],
    },
    {
      name: '我是umi max react子应用CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'yarn',
  qiankun: {
    slave: {},
  },
});
