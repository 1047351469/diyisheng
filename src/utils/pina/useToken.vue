<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

// 刷新 token
const refreshToken = async () => {
  try {
    await authStore.refreshAuthToken();
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};

// 清空状态
const clearAuth = () => {
  authStore.clearAuth();
};
</script>

<template>
  <div>
    <p>Token: {{ authStore.token }}</p>
    <p>Refresh Token: {{ authStore.refreshToken }}</p>
    <button @click="refreshToken">刷新 Token</button>
    <button @click="clearAuth">清空状态</button>
  </div>
</template>
