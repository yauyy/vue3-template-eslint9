import type { ApiResult, HttpMethod } from './type';
import $axios from '.';

const makeRequest = <T>(method: HttpMethod, url: string, data?: any | null, config?: any): Promise<ApiResult<T>> => {
  const isGetOrDelete = method === 'get' || method === 'delete';
  const axiosConfig = isGetOrDelete ? { data, ...config } : { ...config };

  return $axios[method](url, isGetOrDelete ? axiosConfig : data, axiosConfig);
};

export const get = <T>(url: string, data?: any, config?: any) => makeRequest<T>('get', url, data, config);
export const post = <T>(url: string, data?: any, config?: any) => makeRequest<T>('post', url, data, config);
export const put = <T>(url: string, data?: any, config?: any) => makeRequest<T>('put', url, data, config);
export const del = <T>(url: string, data?: any, config?: any) => makeRequest<T>('delete', url, data, config);

export default {
  get,
  post,
  put,
  del,
};
