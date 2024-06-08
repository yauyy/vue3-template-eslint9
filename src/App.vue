<script setup lang="ts">
import type { num } from './test/type';
import { ref } from 'vue';
import axios from 'axios';
import { type Aab } from './type';
import { b } from './index';
// import zx from 'zx';

console.log('🚀 ~ file: App.vue ~ line 3 ~ ba', b);

console.log(axios, 'axios');

// console.log('🚀 ~ a:', a, zx);

const c: Aab = {
  c: 1,
};

const d: num = { a: 1 };
console.log('🚀 ~ d:', d, c?.d);

const r = ref(0);
r.value += 1;

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
