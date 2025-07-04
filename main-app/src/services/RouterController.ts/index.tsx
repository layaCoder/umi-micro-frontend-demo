import { request } from '@umijs/max';

export function getRoutesList(
  params: {
    id?: number;
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<any[]> {
  return request<any[]>('/mock/router/getRoutesList', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
