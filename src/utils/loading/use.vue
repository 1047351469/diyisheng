<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const fetchData = async () => {
  try {
    proxy.$loading.show(); // 显示 loading
    const response = await fetch('https://api.example.com/data');
    console.log('数据:', await response.json());
  } catch (error) {
    console.error('请求错误:', error);
  } finally {
    proxy.$loading.hide(); // 隐藏 loading
  }
};
</script>

<template>
  <div>
    <button @click="fetchData">获取数据</button>
  </div>
</template>
