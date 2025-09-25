import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.ts'

const router = createRouter({
  history: createWebHashHistory(),// 在electron中只能使用hash模式
  routes: constantRoutes,
})

export default router
