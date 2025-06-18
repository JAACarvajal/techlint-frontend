import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage, meta: { title: 'Login' } },
  { path: '/home', component: HomePage, meta: { title: 'Home' } },
  { path: '/register', component: RegisterPage, meta: { title: 'Register' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
