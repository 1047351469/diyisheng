import { addApiLog } from './apiLogger';

const requestInterceptor = (config) => {
  const logEntry = {
    timestamp: new Date().toISOString(), // 请求时间
    url: config.url,                     // 请求路径
    method: config.method,               // 请求方法
    params: config.params || {},         // 查询参数
    data: config.data || {},             // 请求体
  };

  // 暂存日志信息
  config.meta = { logEntry }; // 将日志暂存到 config.meta 中
  return config;
};

export default requestInterceptor;
