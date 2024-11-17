import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
console.error(import.meta.env.VITE_API_BASE_URL+"url")
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // 默认内容类型
    Authorization: 'Bearer YOUR_TOKEN', // 添加默认授权头
  },

});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //请求前的回调
  //添加token
  const tokenStore = useTokenStore();
  //判断有没有token
  if (tokenStore.token) {
    config.headers.Authorization = tokenStore.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.code === 1) {
    return response.data;
  }
  alert(response.data.msg ? response.data.msg : '服务异常')
  //异步操作的状态转换为失败
  return Promise.reject(response.data)
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  alert("超出200")
  return Promise.reject(error);
});
export default instance