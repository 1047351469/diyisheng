import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:catchAll(.*)', // 捕获所有未匹配的路由
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { requiresAuth: true }, 
    },
  ],
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  console.error('before')
  next()
});

export default router
