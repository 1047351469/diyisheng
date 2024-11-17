<script setup lang="ts">
import { getCategoryList } from "@/api/categoryApi.js"
const getData = async () => {
  // 示例：GET 请求
  try {
    let res = await getCategoryList()
    console.error(res)
  } catch (err) {

  }

  console.error(11)

}
</script>

<template>
  <main>
    home
    <VBtn @click="getData">测试</VBtn>
  </main>
</template>
