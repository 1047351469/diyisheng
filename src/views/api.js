import { ref } from 'vue';
import {getCategoryPageList} from "@/api/categoryApi.js"

// 定义 list 为响应式数据
export const list = ref([]);

// 封装 getList 方法，用于获取数据并更新 list
export const getList = async (params ) => {
  try {
    const response = await getCategoryPageList(params);
    list.value = response.data || []; // 假设 response.data 是返回的数据列表
  } catch (error) {
    console.error('Failed to fetch category list:', error);
  }
};