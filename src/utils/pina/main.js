import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/authStore'; // 假设存放在 stores 文件夹中
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount('#app');

// 同步 Pinia state 到 sessionStorage
const authStore = useAuthStore();
authStore.initialize(); // 初始化

// 监听 token 和 refreshToken，自动同步到 sessionStorage
watch(
  () => authStore.$state,
  (newState) => {
    sessionStorage.setItem('token', newState.token);
    sessionStorage.setItem('refreshToken', newState.refreshToken);
  },
  { deep: true } // 深度监听
);
