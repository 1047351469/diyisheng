import axios from 'axios';
import axiosRetry from 'axios-retry';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

// 启用重试功能
axiosRetry(instance, {
  retries: 3, // 最大重试次数
  retryDelay: (retryCount) => {
    console.warn(`请求失败，重试中... 第 ${retryCount} 次重试`);
    return retryCount * 1000; // 重试间隔：1秒、2秒、3秒
  },
  retryCondition: (error) => {
    // 定义重试条件，例如网络错误或超时
    return error.code === 'ECONNABORTED' || error.response?.status >= 500;
  },
});

// 使用示例
instance
  .get('/endpoint')
  .then((response) => {
    console.log('请求成功:', response.data);
  })
  .catch((error) => {
    console.error('请求失败:', error.message);
  });
