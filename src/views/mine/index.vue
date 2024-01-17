<script lang="ts" setup>
  import { showDialog } from 'vant';

  const onClick = async () => {
    showDialog({ message: '提示' });
  };
</script>

<template>
  <div>
    <van-button type="primary" @click="onClick">保存用户信息</van-button>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <van-icon name="chat-o" />
  </div>
</template>
