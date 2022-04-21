import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlliancesIndex from '../views/AlliancesIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alliances',
    name: 'alliances-index',
    component: AlliancesIndex
  },
  {
    path: '/alliances/:name',
    name: 'alliances-show',
    component: () => import('../views/AlliancesShow.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
