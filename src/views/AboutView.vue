<template>
  <div class="about">
    <h1>This is an about page</h1>
    <to-do-list></to-do-list>
  </div>
</template>

<script setup>
import ToDoList from './ToDoList.vue';
</script>
<style scoped>
.todo-container {
  background-color: yellow;
}
</style>
