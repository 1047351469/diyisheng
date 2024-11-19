import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // 基础路径
  timeout: 5000, // 超时时间
  headers: {
    'Authorization': 'Bearer example_token', // 自定义请求头
    'Content-Type': 'application/json', // 指定内容类型
  },
  withCredentials: true, // 携带跨域 Cookie
  responseType: 'json', // 指定响应类型
  validateStatus: (status) => status >= 200 && status < 300, // 自定义状态码校验规则
});

// 使用示例
(async () => {
  const cancelTokenSource = axios.CancelToken.source(); // 创建取消令牌

  try {
    const response = await instance({
      url: '/users', // 请求路径
      method: 'post', // HTTP 方法
      params: { id: 123 }, // 查询参数
      paramsSerializer: (params) => new URLSearchParams(params).toString(), // 自定义参数序列化
      data: { name: 'John Doe', age: 30 }, // 请求体数据
      transformRequest: [
        (data) => {
          console.log('请求体数据转换前:', data);
          return JSON.stringify(data); // 转换数据
        },
      ],
      transformResponse: [
        (data) => {
          console.log('响应数据转换前:', data);
          return JSON.parse(data); // 转换响应数据
        },
      ],
      cancelToken: cancelTokenSource.token, // 关联取消令牌
      auth: { username: 'admin', password: 'password' }, // 基础认证
      proxy: { host: 'proxy.example.com', port: 8080 }, // 代理
      maxContentLength: 5000, // 限制响应内容长度
      maxBodyLength: 2000, // 限制请求体长度
    });

    console.log('响应数据:', response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error('请求已取消:', error.message);
    } else if (error.response) {
      console.error('响应错误:', error.response.status, error.response.data);
    } else {
      console.error('请求错误:', error.message);
    }
  }

  // 手动取消请求（如果需要）
  cancelTokenSource.cancel('操作已取消');
})();
