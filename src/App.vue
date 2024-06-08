<script setup lang="ts">
import axios from 'axios';
// import zx from 'zx';
import { b } from './index';
import type { num } from './test/type';
import { type Aab } from './type';

console.log('🚀 ~ file: App.vue ~ line 3 ~ ba', b);

console.log(axios, 'axios');

// console.log('🚀 ~ a:', a, zx);

const c: Aab = {
  c: 1,
};

const d: num = 1;

console.log(c.c);
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/about"> About </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
a {
  grid-template-areas:
    'a a'
    'b b b';
  colr: hsl(20deg 10% 30% / 5%);
}

a {
  --Foo: 1rem;
}
</style>
