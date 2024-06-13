import type { AxiosError } from 'axios';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export interface IAxiosError extends AxiosError {
  config: {
    headers: any;
    __refresh?: boolean;
  };
}

export interface ApiResult<T = any> {
  ErrCode: number;
  ErrMsg: string;
  Result?: T;
  Results?: T[];
}
