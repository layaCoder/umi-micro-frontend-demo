// src/app.ts
import services from '@/services/demo';
import * as Icons from '@ant-design/icons';
import React from 'react';
import { request as umiRequest, RunTimeLayoutConfig, RequestConfig } from 'umi';
import LazyLoadable from './components/LazyLoadable';
import appConfig from './appConfig';

const { getRoutesList } = services.UserController;

export const request: RequestConfig = {
  baseURL: process.env.NODE_ENV === 'production' ? appConfig?.mainApp.baseUrl : '', 
};

export async function getInitialState(): Promise<{
  name: string;
  accountName: string;
  accountAge: number;
}> {
  try {
    // 模拟调用 API 获取用户信息
    const response = await umiRequest('/api/get/whatsHot'); // 替换为实际的 API URL
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
        colorTextMenu:'#8a8a8a',
        colorTextMenuSelected:'#ffffff',
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
  const response = await umiRequest('/api/get/whatsHot');
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
};

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
let extraRoutes: any[] = [];
/**
 * 获取动态路由
 * @param oldRender
 */
export async function render(oldRender: () => void) {
  // 获取路由信息
  const { data } = await getRoutesList({ id: 1 });
  extraRoutes = data;
  oldRender();
}

// 用来递归处理路由树的函数
const generateRoutes = (
  routes: Routes.RoutesMenuItem[],
  parentId: string = '',
) => {
  console.log('generateRoutes', routes, parentId);
  return routes.map((route) => {
    const { component, children, icon, ...rest } = route;

    const routeId = `${route['id']}`;
    const element = component
      ? LazyLoadable(React.lazy(() => import(`@/${component}`)))
      : undefined;
    const childRoutes = children
      ? generateRoutes(children, routeId)
      : undefined;
    // @ts-ignore
    const iconRoutes = Icons[icon] && LazyLoadable(Icons[icon] as any);

    const data: any = {
      ...rest,
      ...(!isEmpty(iconRoutes) && { icon: iconRoutes }),
      ...(!isEmpty(element) && { element }),
      ...(!isEmpty(childRoutes) && { children: childRoutes }),
      ...(!isEmpty(parentId) && { parentId }),
    };

    return data;
  });
};

/**
 * 处理动态路由赋值问题
 * @param routes
 */
export function patchClientRoutes({ routes }: { routes: any[] }) {
  // 检查 extraRoutes 是否为空
  if (extraRoutes !== undefined && extraRoutes.length === 0) {
    console.warn('没有extraRoutes数据,不添加动态路由');
    return;
  }

  const router = routes.find((item) => item.id === 'ant-design-pro-layout');
  // 检查是否找到了指定的 router
  if (!router) {
    console.warn('Router with id "ant-design-pro-layout" not found');
    return;
  }

  // 检查 router.routes 是否存在并且是数组
  if (!Array.isArray(router.routes)) {
    console.warn('Router does not have a valid routes array');
    router.routes = []; // 初始化 routes 为数组
  }
  // 直接使用 map 和 push 修改 router.routes
  const AsyncRoutes = generateRoutes(extraRoutes, '');
  AsyncRoutes?.forEach((item) => {
    router.routes.push({
      ...item,
    });
  });
}

function isEmpty(
  value: string | object | undefined | object[] | null | boolean,
): value is undefined | null | '' {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0)
  );
}
