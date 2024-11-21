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


要确保 Pinia 的持久化插件在浏览器刷新时不会清除 sessionStorage 的数据，但仍在浏览器关闭时自动清除，需要改进插件的逻辑。


---

更新的持久化插件

修改 piniaStoragePlugin.js

以下是优化后的代码：

// src/plugins/piniaStoragePlugin.js
export function piniaStoragePlugin({ store, options }) {
  const persist = options?.persist;

  // 如果未启用持久化，直接返回
  if (!persist) return;

  // 配置存储类型（默认 sessionStorage）
  const storageType = persist.storage || 'session'; // 'session' 或 'local'
  const storage = storageType === 'local' ? localStorage : sessionStorage;

  // 配置存储键名（默认 pinia-storeId）
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

  // 为 sessionStorage 添加关闭清理逻辑
  if (storageType === 'session') {
    window.addEventListener('beforeunload', () => {
      // 确保数据仅在关闭浏览器时清除，而非刷新页面
      if (performance.navigation.type === performance.navigation.TYPE_NAVIGATE) {
        storage.removeItem(storageKey);
      }
    });
  }
}


---

插件改进点

1. 刷新页面保留数据：

插件检查 performance.navigation.type，仅在页面重新导航（浏览器关闭并重新打开）时清除 sessionStorage。



2. 关闭浏览器清理：

使用 beforeunload 事件，在关闭浏览器时清除数据。





---

注册插件

在 main.js 中注册该插件：

// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { piniaStoragePlugin } from '@/plugins/piniaStoragePlugin';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaStoragePlugin); // 注册持久化插件

app.use(pinia);
app.mount('#app');


---

使用示例

在 Store 中启用持久化：

myStore.js

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

// src/plugins/piniaStoragePlugin.js
export function piniaStoragePlugin({ store, options }) {
  const persist = options?.persist;

  // 如果未启用持久化，直接返回
  if (!persist) return;

  // 配置存储类型（默认 sessionStorage）
  const storageType = persist.storage || 'session'; // 'session' 或 'local'
  const storage = storageType === 'local' ? localStorage : sessionStorage;

  // 配置存储键名（默认 pinia-storeId）
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

  // 添加刷新和关闭页面的清理逻辑
  if (storageType === 'session') {
    // 使用 Vue 生命周期监听浏览器关闭时清除 sessionStorage
    window.addEventListener('beforeunload', () => {
      storage.removeItem(storageKey);
    });
  }
}