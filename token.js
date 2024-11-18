import axios from 'axios';

let isRefreshing = false; // 用于防止重复刷新
let refreshSubscribers = []; // 用于存储在 token 刷新期间的请求

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

// 请求拦截器：为每个请求添加 token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器：处理 401 状态并尝试刷新 token
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;
    
    if (response && response.status === 401) {
      // 如果 token 过期并且没有在刷新中，开始刷新流程
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refresh_token');
        
        return refreshAccessToken(refreshToken).then((newToken) => {
          isRefreshing = false;
          onRrefreshed(newToken);
          refreshSubscribers = [];
          return apiClient(config); // 重试原始请求
        }).catch((error) => {
          // 刷新 token 失败时，清除存储并跳转登录
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(error);
        });
      }

      // 如果已经在刷新，返回一个未决的 Promise 并将请求加入队列
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          resolve(apiClient(config));
        });
      });
    }

    return Promise.reject(error);
  }
);

// 刷新 token 的函数
function refreshAccessToken(refreshToken) {
  return apiClient.post('/auth/refresh', { refresh_token: refreshToken })
    .then((response) => {
      const { token, refresh_token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
      return token;
    });
}

// 订阅 token 刷新
function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

// 通知所有订阅者
function onRrefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
}
