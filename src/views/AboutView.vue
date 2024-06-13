<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUser">获取GET</button>
    <button @click="getToken">获取token</button>
    <button @click="removeToken">移除token</button>
  </div>
</template>

<script setup lang="ts">
import { getUserApi, refreshTokenApi } from '@/api/methods/user';

async function getUser() {
  const res = await getUserApi();
  console.log('🚀 ~ getUser ~ res:', res);
}

async function getToken() {
  const res = await refreshTokenApi();
  localStorage.setItem('token', res.Result);
  console.log('🚀 ~ updateUser ~ res:', res);
}

function removeToken() {
  localStorage.removeItem('token');
}
</script>

<style lang="scss">
@media (width >=1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
