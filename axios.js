import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com', // 替换为你的 API 地址
  timeout: 5000,
});

// 请求和响应信息存储
const apiLogs = [];

// 请求拦截器
apiClient.interceptors.request.use((config) => {
  // 记录接口名称和参数
  const logEntry = {
    name: config.url, // 接口名称（这里简单记录 url，可以根据情况改为更具体的标识）
    params: config.params || config.data, // 参数（GET 请求为 params，POST 请求为 data）
    startTime: Date.now(), // 记录开始时间
  };

  // 为此请求启动计时器
  console.time(`请求 ${config.url}`);
  
  // 将 logEntry 存入 config 中，便于在响应拦截器访问
  config.meta = logEntry;
  
  return config;
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    const { config } = response;
    const logEntry = config.meta;

    // 记录返回值
    logEntry.returnValue = response.data;

    // 计算执行时间
    logEntry.endTime = Date.now();
    logEntry.duration = logEntry.endTime - logEntry.startTime;

    // 结束计时
    console.timeEnd(`请求 ${config.url}`);

    // 存储日志信息
    apiLogs.push(logEntry);

    // 可以在此输出日志，也可以将日志信息发送到监控服务器
    console.log('接口调用信息:', logEntry);

    return response;
  },
  (error) => {
    const { config } = error;
    const logEntry = config?.meta;

    if (logEntry) {
      // 记录错误信息和执行时间
      logEntry.error = error.message;
      logEntry.endTime = Date.now();
      logEntry.duration = logEntry.endTime - logEntry.startTime;

      console.timeEnd(`请求 ${config.url}`);
      console.error('接口错误信息:', logEntry);

      // 存储错误日志
      apiLogs.push(logEntry);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
