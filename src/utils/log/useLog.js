import { getApiLogs } from './apiLogger';

// 打印所有日志
console.log(getApiLogs());

// 示例日志输出
/*
[
  {
    timestamp: "2024-11-19T10:30:00.000Z",
    url: "/api/user",
    method: "GET",
    params: {},
    data: {},
    status: 200,
    response: { id: 1, name: "John Doe" },
    responseTime: "2024-11-19T10:30:01.000Z",
  },
  {
    timestamp: "2024-11-19T10:32:00.000Z",
    url: "/api/login",
    method: "POST",
    params: {},
    data: { username: "test", password: "123456" },
    status: 401,
    error: "Unauthorized",
    responseTime: "2024-11-19T10:32:01.000Z",
  },
];
*/
