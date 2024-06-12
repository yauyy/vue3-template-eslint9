import { get, post } from '../config/methods';

export const getUserApi = () => get('/user');
export const refreshTokenApi = () => post('/get-token', null, { __isRefresh: true });
