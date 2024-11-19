window.onunhandledrejection = (event) => {
    console.error('未处理的 Promise 错误:', event.reason);
  
    // 根据错误内容跳转到特定页面
    if (event.reason.response?.status === 401) {
      console.warn('未授权，跳转到登录页');
      router.push('/login');
    }
  };


  window.onerror = (message, source, lineno, colno, error) => {
    console.error('全局错误:', {
      message,
      source,
      lineno,
      colno,
      error,
    });
  
    // 跳转到全局错误页面
    router.push('/error');
  };

  
  import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    error: null, // 当前错误信息
  }),
  actions: {
    setError(error) {
      this.error = error;
    },
    clearError() {
      this.error = null;
    },
  },
});
<script setup>
import { useErrorStore } from '@/stores/errorStore';

const errorStore = useErrorStore();
</script>

<template>
  <div v-if="errorStore.error" class="error">
    <p>{{ errorStore.error }}</p>
  </div>
</template>

  