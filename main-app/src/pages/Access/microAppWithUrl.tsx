import { MicroApp, MicroAppWithMemoHistory } from 'umi';

const AccessPage: React.FC = () => {
  // 使用 MircroApp 还是 MicroAppWithMemoHistory 参考 https://umijs.org/docs/max/micro-frontend

  return <MicroApp name="app1" base="/app1/page1" />;
  return <MicroAppWithMemoHistory name="app1" url="/app1/page1" />;
};

export default AccessPage;
