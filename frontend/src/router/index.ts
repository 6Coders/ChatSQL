import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import RequestPage from '@/components/RequestPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/',
    name: 'request',
    component: RequestPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
