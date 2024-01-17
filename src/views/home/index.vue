<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import HelloWorld from '@/components/HelloWorld.vue';

  const router = useRouter();

  const onClick = (path: string) => {
    router.push({ path });
  };
</script>

<template>
  <div class="home">
    <ul>
      <li class="text-primary text-12px" @click="onClick('/')">首页</li>
      <li @click="onClick('mine')">我的</li>
    </ul>
    <div class="app-content flex-center">123</div>
    <HelloWorld msg="oooppoo" />
  </div>
</template>
