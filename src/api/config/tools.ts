import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResult } from './type';
import { ERR_STATUS_MAP } from './const';

export const resonseResult = (response: AxiosResponse): ApiResult => {
  console.log('🚀 ~ resonseResult ~ response:', response);
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

export function handleResopnseSuccess(response: AxiosResponse) {
  console.log('🚀 ~ handleResopnseSuccess ~ response:', response);
  return response.data;
}

export const handleResopnseError = (error: AxiosError) => {
  console.log('🚀 ~ handleResopnseError ~ error:', error);
  return Promise.resolve(resonseResult(error.response!));
};
