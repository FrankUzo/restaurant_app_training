import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
