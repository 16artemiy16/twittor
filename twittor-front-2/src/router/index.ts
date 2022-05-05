import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'login',
    component: () => import('@/views/SignInPage.vue' /* webpackChunkName: "SignInPage" */),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUpPage.vue' /* webpackChunkName: "SignUpPage" */),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/sign-in',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
