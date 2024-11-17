<template>
    <div>
      <h2>{{ title }}</h2>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-else>Data: {{ data }}</p>
      <button @click="updateData">Update Data</button>
      <button @click="causeError">Cause Error</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured, onActivated, onDeactivated } from 'vue';
  
  const title = ref("Component Lifecycle Demo");
  const data = ref(null);
  const error = ref(null);
  let intervalId = null;
  
  // 模拟加载数据的函数
  function loadData() {
    data.value = `Loaded at ${new Date().toLocaleTimeString()}`;
    console.log("Data loaded:", data.value);
  }
  
  // 模拟更新数据的函数
  function updateData() {
    data.value = `Updated at ${new Date().toLocaleTimeString()}`;
  }
  
  // 模拟产生错误的函数
  function causeError() {
    throw new Error("This is a simulated error");
  }
  
  // onBeforeMount: 组件挂载前调用
  onBeforeMount(() => {
    console.log("onBeforeMount: Component is about to mount");
  });
  
  // onMounted: 组件挂载后调用
  onMounted(() => {
    console.log("onMounted: Component has mounted");
    loadData();
  
    // 设置一个计时器，每隔 2 秒更新 data
    intervalId = setInterval(() => {
      data.value = `Updated at ${new Date().toLocaleTimeString()}`;
      console.log("Data updated by interval");
    }, 2000);
  });
  
  // onBeforeUpdate: 组件更新前调用
  onBeforeUpdate(() => {
    console.log("onBeforeUpdate: Component is about to update");
  });
  
  // onUpdated: 组件更新后调用
  onUpdated(() => {
    console.log("onUpdated: Component has updated");
    // 例如，重新计算布局或 DOM 操作
  });
  
  // onBeforeUnmount: 组件即将销毁时调用
  onBeforeUnmount(() => {
    console.log("onBeforeUnmount: Component is about to unmount");
  });
  
  // onUnmounted: 组件销毁后调用
  onUnmounted(() => {
    console.log("onUnmounted: Component has unmounted");
    clearInterval(intervalId); // 清除计时器
  });
  
  // onErrorCaptured: 捕获子组件中的错误
  onErrorCaptured((err) => {
    console.error("onErrorCaptured: Error captured:", err);
    error.value = "An error occurred!";
    return false; // 阻止错误继续传播
  });
  
  // onActivated: `<keep-alive>` 组件被激活时调用
  onActivated(() => {
    console.log("onActivated: Component is activated");
    loadData(); // 每次激活时重新加载数据
  });
  
  // onDeactivated: `<keep-alive>` 组件被停用时调用
  onDeactivated(() => {
    console.log("onDeactivated: Component is deactivated");
    clearInterval(intervalId); // 停用时清除计时器
  });
  </script>
  
  <style scoped>
  button {
    margin-right: 10px;
  }
  </style>
  