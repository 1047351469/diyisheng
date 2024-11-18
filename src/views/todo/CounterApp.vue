<template>
    <CounterTemplate :count="count" :increment="increment" />
  </template>
  
  <script setup>
  import {ref,getCurrentInstance,onMounted}from "vue"
 import {useCounter} from "./userCounter.js"
  import CounterTemplate from './CounterTemplate.vue';
  import './CounterStyles.css'; // 导入样式
  
  // 使用计数器逻辑
  const { count, increment } = useCounter();
//   defineOptions({
//   name: 'CounterApp',
// });
import { useLifecycleTracker } from '@/hooks/useLifecycleTracker';
const instance = getCurrentInstance();
let componentName=""
  if (instance) {
    componentName= instance.type.name || 'AnonymousComponent';
    console.log(`Current component name: ${componentName}`);
   
  } else {
    console.warn('getCurrentInstance() returned null. Make sure to call this function within setup().');
   
  }
// 调用 useLifecycleTracker 并传入组件名称
useLifecycleTracker(componentName);

onMounted(() => console.error(11));
  </script>
  