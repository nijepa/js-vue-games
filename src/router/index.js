import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/memory',
    name: 'Memory',
    component: () => import(/* webpackChunkName: "mem" */ '../views/Memory.vue')
  },
  {
    path: '/minesweeper',
    name: 'Minesweeper',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Minesweeper.vue')
  },
  {
    path: '/rockpaperscissors',
    name: 'RockPaperScissors',
    component: () => import(/* webpackChunkName: "rps" */ '../views/RockPaperScissors.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
