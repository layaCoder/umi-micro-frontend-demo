const routes_2 = [
  {
    name: 'api返回路由',
    path: '/table',
    component: 'pages/Table',
    // children: [
    //   {
    //     name: 'api返回子应用路由',
    //     path: '/test',
    //     component: '.pages/Table',
    //   },
    // ],
  },
];

export default {
  //
  'GET /mock/router/getRoutesList': (reg: any, res: any) => {
    console.log('getRoutesList', reg.query.id);
    const data = route;
    res.json({
      code: 10000,
      message: '操作成功',
      data,
      url: '',
      operate: 'admin/Admin/login',
    });
  },
};

const route = [
  {
    id: '3',
    path: '/app2',
    name: '动态路由',
    icon: 'FastForwardOutlined',
    children: [
      {
        id: '4',
        name: '加载子应用',
        icon: 'FastForwardOutlined',
        path: '/app2/table',
        component: 'pages/Order/orderList',
      },
      //   {
      //     id: '5',
      //     name: '用户列表',
      //     icon: 'FastForwardOutlined',
      //     path: '/main/user/list',
      //     component: 'pages/MainPlatform/User/List',
      //   },
    ],
  },
];
