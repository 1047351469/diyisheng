// src/utils/createAxiosInstance.js
import axios from 'axios';

/**
 * 创建 Axios 实例并动态添加拦截器
 * @param {Object} config Axios 配置对象
 * @param {Array} interceptors 拦截器数组，每个拦截器是一个包含 request 和 response 的对象
 * @returns {AxiosInstance} Axios 实例
 */
export function createAxiosInstance(config, interceptors = []) {
  const instance = axios.create(config);

  // 遍历拦截器数组，逐一添加
  interceptors.forEach(({ request, response, error }) => {
    if (request) {
      instance.interceptors.request.use(request);
    }
    if (response || error) {
      instance.interceptors.response.use(response, error);
    }
  });

  return instance;
}

// src/interceptors/timingInterceptor.js
export const timingInterceptor = {
  request: (config) => {
    config.metadata = { startTime: new Date().getTime() };
    return config;
  },
  response: (response) => {
    const duration = new Date().getTime() - response.config.metadata.startTime;
    console.log(`[SUCCESS] ${response.config.url} - ${duration}ms`);
    return response;
  },
  error: (error) => {
    if (error.config?.metadata) {
      const duration = new Date().getTime() - error.config.metadata.startTime;
      console.log(`[FAILURE] ${error.config.url} - ${duration}ms`);
    }
    return Promise.reject(error);
  },
};

// src/utils/apiClient.js
import { createAxiosInstance } from './createAxiosInstance';
import { timingInterceptor } from '@/interceptors/timingInterceptor';

const apiClient = createAxiosInstance(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000,
  },
  [timingInterceptor] // 动态传入拦截器
);

export default apiClient;

<template>
  <div>
    <h1>动态拦截器示例</h1>
    <button @click="fetchData">调用接口</button>
    <p v-if="data">数据: {{ data }}</p>
    <p v-if="error">错误: {{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import apiClient from '@/utils/apiClient';

export default {
  setup() {
    const data = ref(null);
    const error = ref(null);

    const fetchData = async () => {
      data.value = null;
      error.value = null;
      try {
        const response = await apiClient.get('/endpoint'); // 替换为你的 API 路径
        data.value = response.data;
      } catch (err) {
        error.value = err.message || '请求失败';
      }
    };

    return {
      data,
      error,
      fetchData,
    };
  },
};
</script>

