<template>
    <div v-if="visible" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p class="loading-text">加载中...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading',
    data() {
      return {
        visible: false, // 控制显示状态
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .loading-text {
    margin-top: 10px;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  </style>
  