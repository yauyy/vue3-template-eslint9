import type { ApiResult, Params } from './type';
import $axios from '.';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const makeRequest = <P>(method: HttpMethod, url: string, params?: Params<P> | null, config?: any): Promise<ApiResult> => {
  const isGetOrDelete = method === 'get' || method === 'delete';
  const axiosConfig = isGetOrDelete ? { params, ...config } : { ...config };

  return $axios[method](url, isGetOrDelete ? axiosConfig : params, axiosConfig);
};

export const get = <P>(url: string, params?: Params<P> | null, config?: any) => makeRequest('get', url, params, config);
export const post = <P>(url: string, params?: Params<P> | null, config?: any) => makeRequest('post', url, params, config);
export const put = <P>(url: string, params?: Params<P> | null, config?: any) => makeRequest('put', url, params, config);
export const del = <P>(url: string, params?: Params<P> | null, config?: any) => makeRequest('delete', url, params, config);

export default {
  get,
  post,
  put,
  del,
};
