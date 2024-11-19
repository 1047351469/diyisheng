import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('运行时错误:', err);
  console.warn('错误信息:', info);

  // 可以根据情况跳转到错误页面
  router.push('/error');
};

app.use(router);
app.mount('#app');
