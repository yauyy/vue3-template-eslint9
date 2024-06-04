<script setup lang="ts">
const count = ref(0);
</script>

<template>
  <div>
    <h1 @click="count++">
      Home View
    </h1>
  </div>
</template>
