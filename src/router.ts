import VueRouter from 'vue-router';
import AuthedLayout from '@/views/Authed.layout.vue';
import Home from '@/views/authed/Home.vue';
import Explore from '@/views/authed/Explore.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: AuthedLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/explore',
          name: 'explore',
          component: Explore,
        },
      ],
    },
  ],
});

export default router;
