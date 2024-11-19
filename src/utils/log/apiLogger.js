// 用于保存接口日志的对象
const apiLogs = [];

// 添加日志的方法
export const addApiLog = (log) => {
  apiLogs.push(log);
};

// 获取所有日志的方法
export const getApiLogs = () => {
  return apiLogs;
};

// 清空日志的方法
export const clearApiLogs = () => {
  apiLogs.length = 0;
};
