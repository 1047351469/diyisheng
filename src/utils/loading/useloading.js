<template>
  <div>
    <button @click="fetchData">获取数据</button>
    <div v-loading="loading" class="content">
      <p>这里是内容区...</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(false);

    const fetchData = async () => {
      loading.value = true;
      try {
        const response = await fetch('https://api.example.com/data');
        console.log('数据:', await response.json());
      } catch (error) {
        console.error('请求错误:', error);
      } finally {
        loading.value = false;
      }
    };

    return { loading, fetchData };
  },
};
</script>
