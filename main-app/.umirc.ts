import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: [
    {
      path: '/',
      redirect: '/app1/page1',
    },
    {
      path:'/login/*',
      component: './Login',
      layout: false,
    },
    // {
    //   name: '路由绑定子应用Vue3',
    //   path: '/app1',
    //   // component: './Home',
    //   microApp: 'app1',
    // },
    {
      name: '组件加载子应用Vue3',
      // component: './Access',
      path: '/app1',
      routes: [
        {
          name: 'Vue3 Page1',
          path: 'page1',
          component: './Access/microAppWithUrl',
        },
        {
          name: 'Vue3 Page2',
          path: 'page2',
          component: './Access/subAppPage2',
        },
      ],
    },
    // {
    //   name: '路由绑定子应用umi max',
    //   path: '/app2',
    //   microApp: 'app2',
    // },
    // {
    //   name: '组件加载子应用umi max',
    //   path: '/app2',
    //   routes: [
    //     {
    //       name: 'Umi Max Page1',
    //       path: 'table',
    //       component: './Order/orderList',
    //     },
    //     {
    //       name: '子应用嵌套路由',
    //       path: 'access/demo',
    //       component: './Order/table',
    //     },
    //   ],
    // },
    // {
    //   name: '主应用页面CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'yarn',
  qiankun: {
    master: {},
  },
});
