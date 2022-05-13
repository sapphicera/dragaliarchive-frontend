import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogoutView.vue')
  },
  {
    path: '/users/:username',
    name: 'users-profile',
    component: () => import('../views/UsersShow.vue')
  },
  {
    path: '/users/:username/edit',
    name: 'users-edit',
    component: () => import('../views/UsersEdit.vue')
  },
  {
    path: '/alliances',
    name: 'alliances-index',
    component: () => import('../views/AlliancesIndex.vue')
  },
  {
    path: '/alliances/:name',
    name: 'alliances-show',
    component: () => import('../views/AlliancesShow.vue')
  },
  {
    path: '/comics',
    name: 'comics-index',
    component: () => import('../views/ComicsIndex.vue')
  },
  {
    path: '/comics/:id',
    name: 'comics-show',
    component: () => import('../views/ComicsShow.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
