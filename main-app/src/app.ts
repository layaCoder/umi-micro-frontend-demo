// src/app.ts
import { request, RunTimeLayoutConfig } from 'umi';
import { useModel } from 'umi';

export async function getInitialState(): Promise<{ name: string; accountName: string; accountAge: number }> {
  try {
    // 模拟调用 API 获取用户信息
    const response = await request('api url here'); // 替换为实际的 API URL
    const { name, accountName, accountAge } = response.data;

    return {
      name: '@umijs/max',
      accountName,
      accountAge,
    };
  } catch (error) {
    console.error('Failed to fetch initial state:', error);
    return {
      name: '@umijs/max',
      accountName: 'Unknown',
      accountAge: 0,
    };
  }
}



export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  console.log('Initial State:', initialState);
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    title: false,
    layout: 'mix',
    splitMenus: true,
    disableMobile: true,
    //  menuDataRender: (menuData) => {
    //   console.log('Menu Data:', menuData);
    //   // 自定义菜单数据处理逻辑
    //   return menuData;
    // },
    token: {
      header: {
        // 修改 Header 背景颜色
        colorBgHeader: '#001529',
        // 修改 Header 文字颜色
        colorTextHeader: '#ffffff',
        // 修改 Header 分割线颜色
        colorSplitHeader: '#404040',
        // 修改 Header 图标颜色
        colorIconHeader: '#ffffff',
        // 修改 Header 悬浮背景颜色
        colorBgHeaderHover: '#1890ff',
        // 修改 Header 选中背景颜色
        colorBgHeaderSelected: '#1890ff',
      },
      // sider 侧边栏配置 可参考 https://pro-components.antdigital.dev/components/layout#sider-token
      sider: {
        colorMenuBackground: '#001529',
        colorTextMenuTitle: '#ffffff',
        colorMenuItemDivider: 'transparent',
        colorTextMenu: '#8a8a8a',
        colorTextMenuSelected: '#ffffff',
        colorTextMenuItemHover: '#ffffff',
        colorTextMenuActive: '#ffffff',
        colorBgMenuItemSelected: '#1890ff',

      },
    },

  };
};

export const qiankun = async () => {
  const response = await request('https://www.layablog.top/api/get/whatsHot');
  console.log('API Response:', response);
  return {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:3003',
          props: {
            accountOnClick: (event: any) => console.log(event),
            accountName: response[0]._id || 'Default Name', // 动态替换
            accountAge: response[0].title || 0, // 动态替换
          },
        },
        {
          name: 'app2',
          entry: '//localhost:8001',
        },
      ],
    },
  };
}


// 全局路由监听逻辑
export function onRouteChange({ location, routes, action }: any) {
  // 全局路由变化时的回调函数
  console.log('路由发生变化:', location.pathname);
  
  // 示例：权限控制
  const isLogin = localStorage.getItem('token');
  if (!isLogin && location.pathname !== '/login') {
    return {
      pathname: '/login',
      search: `?redirect=${location.pathname}`,
    };
  }
}



