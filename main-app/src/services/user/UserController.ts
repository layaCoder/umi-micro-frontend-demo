
import { request } from '@umijs/max';
const devPrefix = 'http://dev-saas-admin.bak365.top';

export async function login(
  params: {
    userNo?: string;
    userName?: string;
    pass?: string;
  },
  options?: { [key: string]: any },
) {
  return request<User.LoginResponse>(devPrefix+'/api/Account/Login', {
    method: 'POST',

   data:{...params},
    ...(options || {}),
  });
}

