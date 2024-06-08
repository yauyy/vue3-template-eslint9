<script setup lang="ts">
const count = ref(0);
console.log('🚀 ~ count:', count);

// count += 1
</script>

<template>
  <div>
    <h1 @click="count++">Home View</h1>
  </div>
</template>
