import { createApp } from 'vue';
import App from './App.vue';
import Loading from './components/Loading.vue';

const app = createApp(App);

// 动态挂载 Loading 组件
const LoadingConstructor = app.component('Loading', Loading);

const loadingInstance = new LoadingConstructor();
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);
loadingInstance.$mount(mountNode);

app.config.globalProperties.$loading = {
  show: () => loadingInstance.show(),
  hide: () => loadingInstance.hide(),
};

app.mount('#app');
