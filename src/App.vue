<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref,computed } from 'vue'

import { useMouse, useEventListener } from '@vueuse/core'
const { x, y } = useMouse()
const inputDate = "020422 10:53:01PM";

useEventListener('mousemove', () => {
  // console.error(x.value,y.value)
})
// // 自定义函数来解析和转换日期格式
function customParseDate(dateStr) {
  // 将输入字符串 "020422 10:53:01PM" 分割
  const [date, time] = dateStr.split(" ");
  const month = date.slice(0, 2);
  const day = date.slice(2, 4);
  const year = "20" + date.slice(4, 6); // 假设年份为 2000 年代

  let [hour, minute, second] = time.slice(0, 8).split(":");
  const period = time.slice(8);

  // 将 12 小时制转换为 24 小时制
  if (period === "PM" && hour !== "12") {
    hour = (parseInt(hour) + 12).toString();
  } else if (period === "AM" && hour === "12") {
    hour = "00";
  }

  // 使用 dayjs 格式化为 "YYYYMMDD HH:mm:ss"
  return dayjs(`${year}-${month}-${day} ${hour}:${minute}:${second}`).format("YYYY年MM月DD HH:mm:ss");
}


const formattedDate = customParseDate("020422 10:53:01AM");
console.log(formattedDate); 
import { useRoute,useRouter } from 'vue-router';
      
const router = useRouter(); // 获取 router 实例

// 定义导航方法
const navigateToAbout = () => {
  router.push({ name: 'about' ,params:{id:22}}); // 跳转到命名路由 'about'
};

const flag=ref(true)
</script>

<template>
  <div @click="flag=!flag" v-if="flag">
    <RouterLink to="/">Go to Home</RouterLink>
     <RouterLink to="/about">Go to About</RouterLink>
     {{ useRoute().path }}
     <span @click="navigateToAbout">手动导航</span>
  <RouterView />
  </div>
    
</template>

<style scoped></style>
