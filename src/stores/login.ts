import { ref } from 'vue';
import { defineStore } from 'pinia';
import { refreshTokenApi } from '@/api/methods/user';

export const useLoginStore = defineStore('login', () => {
  const token = ref(localStorage.getItem('token') || '');

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const getToken = () => {
    return token.value;
  };

  let promise: Promise<any> | null = null;
  const refreshToken = async () => {
    if (promise) {
      return promise;
    }
    promise = new Promise(async (resolve) => {
      const res = await refreshTokenApi();
      setToken(res.Result ?? '');
      resolve(res.ErrCode === 0);
    });
    promise.finally(() => {
      promise = null;
    });

    return promise;
  };

  return { token, setToken, getToken, refreshToken };
});
