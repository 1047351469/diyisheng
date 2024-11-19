import axiosInstance from './axiosInstance';
import requestInterceptor from './requestInterceptor';
import { responseInterceptor, errorInterceptor } from './responseInterceptor';

// 添加拦截器
axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;

