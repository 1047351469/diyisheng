const axiosErrorInfo = {
    ECONNABORTED: {
      code: 'ECONNABORTED',
      message: 'Request Timeout',
      when: '请求超时，未在指定时间内完成。',
    },
    ERR_NETWORK: {
      code: 'ERR_NETWORK',
      message: 'Network Error',
      when: '网络错误，可能是断网或目标服务器不可达。',
    },
    ERR_BAD_REQUEST: {
      code: 'ERR_BAD_REQUEST',
      message: 'Bad Request',
      when: '请求参数错误或配置不正确。',
    },
    ERR_BAD_RESPONSE: {
      code: 'ERR_BAD_RESPONSE',
      message: 'Bad Response',
      when: '服务器返回非 2xx 状态码的响应。',
    },
    ERR_CANCELED: {
      code: 'ERR_CANCELED',
      message: 'Request Canceled',
      when: '请求被取消，可能是手动调用 `cancelToken` 或超时中断。',
    },
    ERR_FR_TOO_MANY_REDIRECTS: {
      code: 'ERR_FR_TOO_MANY_REDIRECTS',
      message: 'Too Many Redirects',
      when: '重定向次数过多，可能是循环重定向问题。',
    },
    NO_RESPONSE: {
      code: 'NO_RESPONSE',
      message: 'No Response',
      when: '服务器未返回响应，可能是服务器未启动或断网。',
    },
    UNKNOWN_ERROR: {
      code: 'UNKNOWN_ERROR',
      message: 'Unknown Error',
      when: '未知错误，通常是代码逻辑问题。',
    },
  };
  