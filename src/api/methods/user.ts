import { get, post } from '../config/methods';

export const getUserApi = (params: any) => get('/get-user', params);
export const updateUserApi = (params: any) => post('/get-user?apipost_id=34d873f43880312', params);
