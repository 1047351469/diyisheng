import axios from 'axios';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加第一个请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('请求拦截器1: 添加通用头');
    config.headers['Common-Header'] = 'CommonHeaderValue';
    return Promise.reject(new Error('缺少 Authorization 头')); // 
    中断了
    return config;
  },
  (error) => {
    console.error('请求拦截器1错误:', error);
    return Promise.reject(error);
  }
);

// 添加第二个请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('请求拦截器2: 修改请求参数');
    if (config.method === 'post') {
      config.data = { ...config.data, extraParam: 'extraValue' };
    }
    return config;
  },
  (error) => {
    console.error('请求拦截器2错误:', error);
    return Promise.reject(error);
  }
);

// 添加第一个响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('响应拦截器1: 处理响应数据');
    if (response.data.success === false) {
      console.warn('业务失败');
    }
    return response;
  },
  (error) => {
    console.error('响应拦截器1错误:', error);
    return Promise.reject(error);
  }
);

// 添加第二个响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('响应拦截器2: 转换数据格式');
    return {
      ...response,
      customData: 'CustomData',
    };
  },
  (error) => {
    console.error('响应拦截器2错误:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

请求拦截器的顺序（按照注册顺序）：

请求拦截器1 → 请求拦截器2 → 发起请求。
响应拦截器的顺序（按照注册顺序的倒序）：

接收到响应后，响应拦截器2 → 响应拦截器1。
