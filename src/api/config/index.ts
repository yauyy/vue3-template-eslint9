import axios from 'axios';
import { handleRequestError, handleRequestSuccess, handleResopnseError, handleResopnseSuccess } from './tools';
const { VITE_BASE_URL: baseURL } = import.meta.env;
console.log('🚀 ~ baseURL:', baseURL);

const TIMEOUT = 1000;
const $axios = axios.create({
  baseURL,
  timeout: TIMEOUT,
});

$axios.interceptors.request.use(handleRequestSuccess, handleRequestError);

$axios.interceptors.response.use(handleResopnseSuccess, (error) => handleResopnseError(error, $axios));

export default $axios;
