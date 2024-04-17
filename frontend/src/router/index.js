import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import ManagerPage from '../views/ManagerPage.vue'
import RequestPage from '../views/RequestPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/manager',
    name: 'manager',
    component: ManagerPage
  },
  {
    path: '/request',
    name: 'request',
    component: RequestPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router