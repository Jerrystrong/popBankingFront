import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import historiqueView from '../views/historiqueView.vue'
import queuCallView from '../views/queuCallView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/historique',
      name: 'historique',
      component: historiqueView,
    },
    {
      path: '/queuecall',
      name: 'queue',
      component: queuCallView,
    },
  ],
})

export default router
