import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import RequestPage from '@/components/RequestPage.vue'
import ManagerPage from '@/components/ManagerPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/request',
    name: 'request',
    component: RequestPage
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerPage
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
