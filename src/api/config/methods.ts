import type { Params } from './type';
import $axios from '.';

export const get = <P>(url: string, params?: Params<P>, config?: any) => $axios.get(url, { params, ...config });
export const post = <P>(url: string, params?: Params<P>, config?: any) => $axios.post(url, params, { ...config });
