// src/plugins/piniaStoragePlugin.js
export function piniaStoragePlugin({ store, options }) {
  // 获取持久化配置
  const persist = options?.persist;

  // 如果没有配置持久化选项，直接返回
  if (!persist) return;

  // 配置持久化的存储类型，默认为 sessionStorage
  const storageType = persist.storage || 'session'; // 'session' 或 'local'
  const storage = storageType === 'local' ? localStorage : sessionStorage;

  // 配置存储的键名，默认为 `pinia-${store.$id}`
  const storageKey = persist.key || `pinia-${store.$id}`;

  // 初始化：从 storage 加载数据到 Pinia Store
  const storedData = storage.getItem(storageKey);
  if (storedData) {
    store.$patch(JSON.parse(storedData));
  }

  // 监听 Pinia Store 的变化，同步到 storage
  store.$subscribe((_, state) => {
    storage.setItem(storageKey, JSON.stringify(state));
  });

  // 如果使用 sessionStorage，监听浏览器关闭事件，清理数据
  if (storageType === 'session') {
    window.addEventListener('beforeunload', () => {
      storage.removeItem(storageKey);
    });
  }
}

// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { piniaStoragePlugin } from '@/plugins/piniaStoragePlugin';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaStoragePlugin); // 注册插件

app.use(pinia);
app.mount('#app');

// src/stores/myStore.js
import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    myObject: { name: '', age: 0 },
  }),
  actions: {
    updateMyObject(key, value) {
      this.myObject[key] = value;
    },
    clearMyObject() {
      this.myObject = { name: '', age: 0 };
    },
  },
  // 持久化选项
  persist: {
    storage: 'local', // 可选 'session' 或 'local'，默认为 'session'
    key: 'myCustomKey', // 可选，存储键名，默认为 `pinia-${store.$id}`
  },
});