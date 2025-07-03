import { MicroApp } from 'umi';

const AccessPage: React.FC = () => {
  // base 是主引用的前缀路径， 子应用路由会在这个基础上进行拼接
  return <MicroApp name="app2" base="/app2" />;
};

export default AccessPage;
