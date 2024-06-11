import { ref } from 'vue';
import { defineStore } from 'pinia';
import { refreshTokenApi } from '@/api/methods/user';

export const useLoginStore = defineStore('login', () => {
  const token = ref(sessionStorage.getItem('token') || '');

  const setToken = (newToken: string) => {
    token.value = newToken;
    sessionStorage.setItem('token', newToken);
  };

  const getToken = () => {
    return token.value;
  };

  const login = () => {
    // Call login API
  };

  const refreshToken = async () => {
    // Call refresh token API
    const res = await refreshTokenApi();
    if (res.Result) {
      setToken(res.Result);
    }
    return res;
  };

  return { token, setToken, getToken, login, refreshToken };
});
