import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResult } from './type';
import { ERR_STATUS_MAP } from './const';
import $axios from '.';
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
    authToken: localStorage.getItem('token'),
    AppId: '123456',
  });
  return config;
};

export const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

export function handleNetworkError(errStatus: number) {
  return errStatus ? ERR_STATUS_MAP.get(errStatus) || `其他连接错误 --${errStatus}` : '未知错误';
}

export function handleResopnseSuccess(response: AxiosResponse): AxiosResponse['data'] {
  return response.data;
}

export const handleResopnseError = async (error: AxiosError) => {
  console.log('🚀 ~ handleResopnseError ~ error:', error);
  // 500 模拟登录失效
  if (error.response?.status === 401 && !error.config!.url?.includes('get-token')) {
    const res = await refreshToken();
    console.log('🚀 ~ handleResopnseError ~ res:', res);
    if (!res) {
      alert('登录失效，请重新登录');
      return resonseResult(error.response!);
    }
    error.config!.headers.authToken = localStorage.getItem('token');

    const insRes = await $axios.request(error.config!);
    return insRes;
  }
  return resonseResult(error.response!);
};
