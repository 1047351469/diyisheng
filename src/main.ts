import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
      },
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
  })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
// 封装的全局方法
app.config.globalProperties.$formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

app.mount('#app')
// const promise1 = Promise.resolve(3);
// const promise2 = new Promise((resolve,reject) => setTimeout(reject, 100, 'foo'));
// const promise3 = Promise.resolve(42);

// Promise.all([promise1,  promise3,promise2])
//   .then((values) => console.log(values)) // 输出: [3, 'foo', 42]
//   .catch((error) => console.error(error));
  // const promise1 = new Promise((resolve) => setTimeout(resolve, 100, '快速结果'));
  // const promise2 = new Promise((resolve) => setTimeout(resolve, 200, '慢速结果'));
  
  // Promise.race([promise1, promise2])
  //   .then((result) => {
  //     console.log(result); // 输出: '快速结果'
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  try{
    let a={}
    console.log(a.b())
  }catch(err){
    console.error(err)
  }
  









