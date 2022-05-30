import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Board from '../views/Board.vue'
import Account from '../views/Account.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/powiadomienia',
    name: 'Board',
    component: Board
  },
  {
    path: '/informacje',
    name: 'About',
    component: About
  },
  {
    path: '/konto',
    name: 'Account',
    component: Account
  },
  {
    path: '/logowanie',
    name: 'Login',
    component: Login
  },
  {
    path: '/rejestracja',
    name: 'Register',
    component: Register
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
