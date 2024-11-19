import { refreshToken, setToken } from './tokenManager';
import axiosInstance from './axiosInstance';

let isRefreshing = false;
let requestsQueue = [];

const responseInterceptor = async (response) => {
  console.log('响应结果:', response.data);
  return response;
};

const errorInterceptor = async (error) => {
  const originalRequest = error.config;
  const status = error.response?.status;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        setToken(newToken);
        isRefreshing = false;

        // 重试队列中的请求
        requestsQueue.forEach((callback) => callback(newToken));
        requestsQueue = [];

        // 重试原始请求
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('刷新 token 失败:', refreshError);
        isRefreshing = false;
        requestsQueue = [];
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return new Promise((resolve) => {
      requestsQueue.push((newToken) => {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        resolve(axiosInstance(originalRequest));
      });
    });
  }

  switch (status) {
    case 400:
      console.error('请求参数错误:', error.response.data);
      break;
    case 403:
      console.error('无权限访问:', error.response.data);
      break;
    case 404:
      console.error('资源未找到:', error.response.data);
      break;
    case 500:
      console.error('服务器内部错误:', error.response.data);
      break;
    default:
      console.error('其他错误:', error.response?.data || error.message);
  }
  return Promise.reject(error);
};

export { responseInterceptor, errorInterceptor };
