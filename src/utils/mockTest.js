import axiosInstance from './mock';

// 模拟成功请求
axiosInstance
  .get('/success')
  .then((response) => {
    if (response.data.code === 1) {
      console.log('成功响应:', response.data.data);
    } else {
      console.error('响应失败:', response.data.msg);
    }
  })
  .catch((error) => {
    console.error('请求错误:', error.message);
  });

// 模拟各种失败请求
const testUrls = ['/error', '/unauthorized', '/forbidden', '/not-found', '/server-error', '/timeout', '/network-error'];

testUrls.forEach((url) => {
  axiosInstance
    .get(url)
    .then((response) => {
      if (response.data.code === 1) {
        console.log(`${url} 成功响应:`, response.data.data);
      } else {
        console.error(`${url} 响应失败:`, response.data.msg);
      }
    })
    .catch((error) => {
      console.error(`${url} 请求错误:`, error.message);
    });
});
