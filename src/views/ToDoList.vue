<template>

    <div class="todo-container">
        <v-btn class="my-button">Button</v-btn>
        <v-btn color="green">Button</v-btn>
        <h1>To-Do List</h1>

        <!-- 搜索框 -->
        <div class="search-container">
            <input type="text" placeholder="Search tasks..." v-model="search">
        </div>

        <!-- 新任务输入框与添加按钮 -->
        <div class="add-container">
            <input v-model="name" type="text" placeholder="Enter a new task...">
            <button @click="addItem">Add Task</button>
        </div>

        <!-- 任务列表 -->
        <ul class="task-list">
            <!--li class="completed" -->
            <li v-for="item in searchItems" :id="item.id" :class="{ completed: item.status }">
                <span>{{ item.name }}</span>

                <div class="task-actions">
                    <button class="complete-btn" @click="item.status = !item.status">✓</button>
                    <button class="edit-btn">✎</button>
                    <button class="delete-btn" @click="deleteItem(item.id)">✗</button>
                </div>
            </li>

        </ul>

        <!-- 任务统计信息 -->
        <div class="stats">
            <p>Total tasks: <span>{{ totalCount }}</span></p>
            <p>Completed tasks: <span>{{ leftCount }}</span></p>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue"
const items = ref([{
    id: 1,
    status: false,
    name: '11'
}, {
    id: 2,
    status: true,
    name: '22'
}

])
const deleteItem = (id) => {
    items.value = items.value.filter(item => item.id != id)
}
const name = ref("")
const addItem = () => {
    let id = items.value[items.value.length - 1] + 1
    items.value.push({ id, name: name.value, status: false })
    name.value = ""
}
const totalCount = computed(() => {
    return items.value.length
})
const leftCount = computed(() => {
    return items.value.filter(item => !item.status).length
})
const search = ref("")
const searchItems = computed(() => {
    return items.value.filter(item => item.name.includes(search.value))
})
onMounted(() => {
    console.error("onmounted")
})
watch(search, (newVal, oldVal) => {
    console.error(newVal, oldVal)
}, { immediate: true, deep: true })
</script>

<style scoped lang="less">
@import url("@/assets/todolist.css");

</style>