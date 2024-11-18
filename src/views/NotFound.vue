<template>
    <span @click="flag=!flag"> not found 404</span>
   
    <life></life>
    <css></css>
    <counter-app v-if="flag"/>
</template>
<script setup>
 import {list,getList} from './api.js'
 import {ref,onMounted} from "vue"

 import Life from "./Life.vue"
 import css from "./css.vue"
 import CounterApp from './todo/CounterApp.vue'
 const flag=ref(true)
//  onMounted(()=>{
//     getList({page:1,pageSize:5})
//  })
</script>