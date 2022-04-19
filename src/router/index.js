import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlliancesIndex from '../views/AlliancesIndex.vue'
import AlliancesShow from '../views/AlliancesShow.vue'

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
    component: AlliancesShow
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
