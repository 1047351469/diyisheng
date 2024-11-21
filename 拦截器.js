// src/utils/createAxiosInstance.js
import axios from 'axios';

/**
 * 创建 Axios 实例，并动态添加拦截器
 * @param {Object} config Axios 配置对象
 * @param {Array} interceptors 拦截器数组
 * @returns {AxiosInstance} Axios 实例
 */
export function createAxiosInstance(config, interceptors = []) {
  const instance = axios.create(config);

  // 遍历并添加每个拦截器
  interceptors.forEach(({ onRequest, onResponse, onError }) => {
    if (onRequest) {
      instance.interceptors.request.use(onRequest);
    }
    if (onResponse || onError) {
      instance.interceptors.response.use(onResponse, onError);
    }
  });

  return instance;
}


// src/interceptors/timingInterceptor.js
export const timingInterceptor = {
  onRequest: (config) => {
    config.metadata = { startTime: new Date().getTime() }; // 记录开始时间
    return config;
  },
  onResponse: (response) => {
    const duration = new Date().getTime() - response.config.metadata.startTime;
    console.log(`[SUCCESS] ${response.config.url} - ${duration}ms`);
    return response;
  },
  onError: (error) => {
    if (error.config?.metadata) {
      const duration = new Date().getTime() - error.config.metadata.startTime;
      console.log(`[FAILURE] ${error.config.url} - ${duration}ms`);
    }
    return Promise.reject(error);
  },
};

// src/interceptors/resultInterceptor.js
export const resultInterceptor = {
  onResponse: (response) => {
    const { data } = response;
    if (data.success) {
      return data.result; // 如果返回结构符合预期，直接返回结果
    } else {
      console.error(`[DATA ERROR] ${response.config.url}:`, data.message);
      return Promise.reject(new Error(data.message || '接口数据错误'));
    }
  },
  onError: (error) => {
    if (error.response) {
      console.error(`[SERVER ERROR] ${error.config.url}:`, error.response.status, error.response.data);
      return Promise.reject(new Error('服务器错误，请稍后重试'));
    } else if (error.request) {
      console.error(`[NETWORK ERROR] ${error.config.url}:`, error.message);
      return Promise.reject(new Error('网络错误，请检查网络连接'));
    } else {
      console.error(`[CONFIG ERROR] ${error.config?.url || 'Unknown URL'}:`, error.message);
      return Promise.reject(new Error('请求配置错误'));
    }
  },
};

// src/interceptors/loadingInterceptor.js
let loadingCount = 0;

const showLoading = () => {
  loadingCount += 1;
  console.log('Loading started...');
};

const hideLoading = () => {
  loadingCount -= 1;
  if (loadingCount <= 0) {
    console.log('Loading finished...');
    loadingCount = 0;
  }
};

export const loadingInterceptor = {
  onRequest: (config) => {
    showLoading();
    return config;
  },
  onResponse: (response) => {
    hideLoading();
    return response;
  },
  onError: (error) => {
    hideLoading();
    return Promise.reject(error);
  },
};

