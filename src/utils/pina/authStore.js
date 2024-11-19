import { defineStore } from 'pinia';
import axios from 'axios';
import { watch } from 'vue';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') || '', // 从 sessionStorage 初始化 token
    refreshToken: sessionStorage.getItem('refreshToken') || '', // 初始化 refreshToken
  }),

  actions: {
    // 初始化方法：从 sessionStorage 加载 token 和 refreshToken
    initialize() {
      this.token = sessionStorage.getItem('token') || '';
      this.refreshToken = sessionStorage.getItem('refreshToken') || '';
    },

    // 请求刷新 token
    async refreshAuthToken() {
      try {
        const response = await axios.post('/auth/refresh', {
          refreshToken: this.refreshToken,
        });
        const { token, refreshToken } = response.data;

        this.token = token;
        this.refreshToken = refreshToken;

        console.log('Token refreshed successfully');
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.clearAuth(); // 清空状态
        throw error;
      }
    },

    // 清空 token 和 refreshToken
    clearAuth() {
      this.token = '';
      this.refreshToken = '';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
    },
  },
});

