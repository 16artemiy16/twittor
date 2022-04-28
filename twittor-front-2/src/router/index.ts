import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'login',
    component: () => import('@/views/SignInPage.vue' /* webpackChunkName: "SignInPage" */),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
