import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
