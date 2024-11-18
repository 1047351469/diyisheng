// src/composables/useLifecycleTracker.js
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export function useLifecycleTracker(componentName) {
  const startTimes = {};

  // 记录开始时间
  const recordStartTime = (hookName) => {
    startTimes[hookName] = performance.now();
  };

  // 计算并输出执行时间
  const logExecutionTime = (hookName) => {

    const endTime = performance.now();
    const duration = endTime - startTimes[hookName];
    console.log(`${componentName} - ${hookName} execution time: ${duration.toFixed(2)} ms`);
  };

  onBeforeMount(() =>
   
    recordStartTime('onBeforeMount'));
  onMounted(() => logExecutionTime('onBeforeMount'));

  onBeforeUpdate(() => recordStartTime('onBeforeUpdate'));
  onUpdated(() => logExecutionTime('onBeforeUpdate'));

  onBeforeUnmount(() => recordStartTime('onBeforeUnmount'));
  onUnmounted(() => logExecutionTime('onBeforeUnmount'));
}
