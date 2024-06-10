<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getUser">获取GET</button>
    <button @click="updateUser">POST</button>
  </div>
</template>

<script setup lang="ts">
import { getUserApi, updateUserApi } from '@/api/methods/user';

async function getUser() {
  const res = await getUserApi({ id: 123, apipost_id: '346e66b8388000' });
  console.log('🚀 ~ getUser ~ res:', res);
}

async function updateUser() {
  const res = await updateUserApi({ id: 123, apipost_id: '34d873f4388031' });
  console.log('🚀 ~ updateUser ~ res:', res);
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
