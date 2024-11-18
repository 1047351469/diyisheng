<!-- src/components/CounterTemplate.vue -->
<template>
  <div class="counter">
    <h1>Counter: {{ count }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义 props，用于接收父组件传递的 count 和 increment
const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
  increment: {
    type: Function,
    required: true,
  },
});
</script>
