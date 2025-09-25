import { RouteRecordRaw } from "vue-router";


/**
 * 共同常驻路由
 */
const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      hidden: true,
    },
    children: [],
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true,
    },
    alias: '/:pathMatch(.*)*',
  },
]

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  ...commonRoutes,
  {
    path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: '/404',
    name: 'ErrorPage',
    meta: {
      hidden: true,
    },
  },
]