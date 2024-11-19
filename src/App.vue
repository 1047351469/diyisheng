<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref,computed } from 'vue'

import { useMouse, useEventListener } from '@vueuse/core'
const { x, y } = useMouse()
const inputDate = "020422 10:53:01PM";

useEventListener('mousemove', () => {
  // console.error(x.value,y.value)
  
})




import { useRoute,useRouter } from 'vue-router';
      
const router = useRouter(); // 获取 router 实例

// 定义导航方法
const navigateToAbout = () => {
  router.push({ name: 'about' ,params:{id:22}}); // 跳转到命名路由 'about'
};


import xtxMessage from "./components/xtx-message.vue"
import Message from '@/components/Message.js'
import xtxSkeleton from "@/components/xtx-skeleton.vue"
// 定义计数器状态
const count = ref(0);

// 定义累加器方法
const increment = () => {
  count.value++;
  Message({text:count.value})
};

</script>

<template>
  <xtx-skeleton bg="#e4e4e4" width="306px" height="306px" animated/>
  <VBtn @click="increment">点击</VBtn>
 
    <RouterLink to="/">Go to Home</RouterLink>
     <RouterLink to="/about">Go to About</RouterLink>
     {{ useRoute().path }}
     <span @click="navigateToAbout">手动导航</span>
  <RouterView />

    
</template>

<style scoped></style>
