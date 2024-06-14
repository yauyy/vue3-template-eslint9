import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ApiResult, IAxiosError } from './type';
import { ERROR_CODE, ERR_STATUS_MAP } from './const';
import { useLoginStore } from '@/stores/login';
const { refreshToken } = useLoginStore();
const { VITE_BASE_URL: baseURL } = import.meta.env;

const TIMEOUT = 60 * 1000;
const $axios = axios.create({
  baseURL,
  timeout: TIMEOUT,
});

$axios.interceptors.request.use(handleRequestSuccess, handleRequestError);

$axios.interceptors.response.use(handleResopnseSuccess, handleResopnseError);

function resonseResult(response: AxiosResponse): ApiResult {
  const status = response?.status ?? ERROR_CODE;
  return {
    ErrCode: status,
    ErrMsg: handleNetworkError(status),
  };
}

function handleRequestSuccess(config: InternalAxiosRequestConfig) {
  // 设置头部信息
  config.headers = Object.assign(config.headers, {
    authToken: localStorage.getItem('token'),
    // AppId: '123456',
  });
  return config;
}

function handleRequestError(error: AxiosError) {
  return Promise.reject(error);
}

export function handleNetworkError(errStatus: number) {
  return errStatus ? ERR_STATUS_MAP.get(errStatus) || `其他连接错误 ${errStatus}` : '未知错误';
}

function handleResopnseSuccess(response: AxiosResponse): AxiosResponse['data'] {
  return response.data;
}

async function handleResopnseError(error: IAxiosError) {
  // 500 模拟登录失效
  if (error.response?.status === 401 && !error.config.__refresh) {
    const res = await refreshToken();
    if (!res) {
      alert('登录失效，请重新登录');
      return resonseResult(error.response!);
    }
    // token 刷新成功，重新请求
    error.config!.headers.authToken = localStorage.getItem('token');

    const insRes = await $axios.request(error.config);
    return insRes;
  }
  return resonseResult(error.response!);
}

export default $axios;
