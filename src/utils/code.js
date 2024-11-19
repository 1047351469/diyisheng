const errorMessages = {
    200: 'Success',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    429: 'Too Many Requests',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    ECONNABORTED: 'Request Timeout',
    NETWORK_ERROR: 'Network Error',
    CORS_ERROR: 'CORS Error',
    UNEXPECTED_ERROR: 'Unexpected Error',
  };
  
  // 获取错误消息
  const getErrorMessage = (code) => errorMessages[code] || 'Unknown Error';
  
  // 示例
  console.log(getErrorMessage(404)); // 输出: Not Found
  console.log(getErrorMessage('ECONNABORTED')); // 输出: Request Timeout
  console.log(getErrorMessage(999)); // 输出: Unknown Error
  