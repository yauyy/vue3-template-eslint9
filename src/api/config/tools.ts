import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResult } from './type';
import { ERR_STATUS_MAP } from './const';
import { useLoginStore } from '@/stores/login';

const { refreshToken } = useLoginStore();

export const resonseResult = (response: AxiosResponse): ApiResult => {
  const status = response?.status ?? '6000';
  return {
    ErrCode: status,
    ErrMsg: handleNetworkError(status),
  };
};

export const handleRequestSuccess = (config: InternalAxiosRequestConfig) => {
  config.headers = Object.assign(config.headers, {
    authToken: localStorage.getItem('token') || '1234565',
    AppId: '123456',
  });
  return config;
};

export const handleRequestError = (error: AxiosError) => {
  return Promise.resolve(resonseResult(error.response!));
};

export function handleNetworkError(errStatus: number) {
  return errStatus ? ERR_STATUS_MAP.get(errStatus) || `其他连接错误 --${errStatus}` : '未知错误';
}

export function handleResopnseSuccess(response: AxiosResponse): AxiosResponse['data'] {
  console.log('🚀 ~ handleResopnseSuccess ~ response:', response);
  return response.data;
}

let refresh = false;
const refreshApi: any = [];

export const handleResopnseError = async (error: AxiosError, request: AxiosInstance) => {
  console.log('🚀 ~ handleResopnseError ~ data:', request);
  console.log('🚀 ~ handleResopnseError ~ error:', error);
  // 500 模拟登录失效
  if (error.response?.status === 500) {
    refreshApi.push(error.config!);

    if (refresh) {
      return;
    }
    refresh = true;
    const res = await refreshToken();
    if (res.Result) {
      refresh = false;
      refreshApi.forEach((cb: any) => request(cb));
    }
    return res;
  }
  return Promise.resolve(resonseResult(error.response!));
};
