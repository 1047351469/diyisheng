import { addApiLog } from './apiLogger';

const responseInterceptor = (response) => {
  // 从请求配置中获取日志条目
  const logEntry = response.config.meta?.logEntry || {};

  // 补充响应信息
  logEntry.status = response.status;     // 响应状态码
  logEntry.response = response.data;     // 响应数据
  logEntry.responseTime = new Date().toISOString(); // 响应时间

  // 保存日志
  addApiLog(logEntry);

  return response;
};

const errorInterceptor = (error) => {
  const logEntry = error.config?.meta?.logEntry || {};

  // 补充错误信息
  logEntry.status = error.response?.status || 'NETWORK_ERROR'; // 状态码
  logEntry.error = error.message;                             // 错误信息
  logEntry.responseTime = new Date().toISOString();           // 响应时间

  // 保存日志
  addApiLog(logEntry);

  return Promise.reject(error);
};

export { responseInterceptor, errorInterceptor };
