<template>
  <div
    :style="circleStyle"
    @click="toggleBackground"
  ></div>
</template>

<script setup>
import { computed } from 'vue';

// 定义 props
defineProps({
  modelValue: {
    type: Boolean,
    default: false, // 初始值，父组件通过 v-model 绑定
  },
  size: {
    type: [String, Number],
    default: 50, // 圆的直径，默认 50px
  },
  borderColor: {
    type: String,
    default: '#000', // 边框颜色，默认黑色
  },
  fillColor: {
    type: String,
    default: '#00f', // 填充颜色，默认蓝色
  },
  transitionDuration: {
    type: [String, Number],
    default: 300, // 过渡效果的时间，默认 300ms
  },
});

// 定义事件
const emit = defineEmits(['update:modelValue']);

// 计算圆的样式
const circleStyle = computed(() => ({
  width: `${size}px`,
  height: `${size}px`,
  border: `2px solid ${borderColor}`,
  borderRadius: '50%',
  backgroundColor: modelValue ? fillColor : 'transparent',
  transition: `background-color ${transitionDuration}ms ease-in-out`,
  cursor: 'pointer',
}));

// 切换背景颜色
const toggleBackground = () => {
  emit('update:modelValue', !modelValue); // 更新 v-model
};
</script>

<style scoped>
/* 可选：为按钮添加 hover 效果 */
div:hover {
  opacity: 0.9;
}
</style>

<template>
  <div>
    <h1>圆形单选按钮</h1>
    <p>当前值: {{ isFilled }}</p>
    <CircleButton
      v-model="isFilled"
      :size="100"
      borderColor="red"
      fillColor="green"
      :transitionDuration="500"
    />
    <button @click="toggleValue">外部切换</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CircleButton from './CircleButton.vue';

// 控制圆形填充状态
const isFilled = ref(false);

// 外部按钮切换填充状态
const toggleValue = () => {
  isFilled.value = !isFilled.value;
};
</script>