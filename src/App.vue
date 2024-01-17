<script setup lang="ts">
  import VConsole from 'vconsole';

  const VITE_USE_VCONSOLE = JSON.parse(import.meta.env.VITE_USE_VCONSOLE as any);

  onMounted(() => {
    VITE_USE_VCONSOLE && new VConsole();
  });
</script>

<template>
  <div><router-view /></div>
</template>
