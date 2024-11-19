import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 创建 MockAdapter 实例
const mock = new MockAdapter(axiosInstance);

// 模拟所有请求情况
mock.onGet('/success').reply(200, {
  data: { id: 1, name: 'John Doe' },
  code: 1,
  msg: '请求成功',
});

mock.onPost('/error').reply(400, {
  data: null,
  code: 0,
  msg: '请求参数错误',
});

mock.onGet('/unauthorized').reply(401, {
  data: null,
  code: 0,
  msg: '未授权',
});

mock.onGet('/forbidden').reply(403, {
  data: null,
  code: 0,
  msg: '禁止访问',
});

mock.onGet('/not-found').reply(404, {
  data: null,
  code: 0,
  msg: '资源未找到',
});

mock.onGet('/server-error').reply(500, {
  data: null,
  code: 0,
  msg: '服务器内部错误',
});

// 模拟超时
mock.onGet('/timeout').timeout();

// 模拟网络错误
mock.onGet('/network-error').networkError();

export default axiosInstance;
