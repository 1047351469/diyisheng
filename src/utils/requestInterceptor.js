import { getToken } from './tokenManager';

// 请求拦截器
const requestInterceptor = (config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(`请求路径: ${config.url}`);
  console.log(`请求方法: ${config.method}`);
  if (config.data) {
    console.log('请求参数:', config.data);
  }
  return config;
};

export default requestInterceptor;
