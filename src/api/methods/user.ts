import { get, post } from '../config/methods';

export const getUserApi = () => get('/user');
export const refreshTokenApi = <T = any>() => post<T>('/get-token', null, { __isRefresh: true });
