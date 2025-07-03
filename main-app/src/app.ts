// src/app.ts
import { request } from 'umi';
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



export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    title: false,
    layout: 'mix',
    disableMobile: true,

  };
};

export const qiankun = async()=>{
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
            accountName: response[0]._id|| 'Default Name', // 动态替换
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



