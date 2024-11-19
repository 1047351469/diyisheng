<template>
  <Transition name="down">
    <div class="xtx-message"  v-show="visible">
      <!-- 上面绑定的是样式 -->
      <v-icon :color="type" icon="$vuetify" size="x-small"></v-icon>
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'warning'
    },
  },
  setup () {
    // 控制元素显示隐藏
    const visible = ref(false)
    onMounted(() => {
      visible.value = true
    })
    return { visible }
  }
}
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(0,-75px,0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
