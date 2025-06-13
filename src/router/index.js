import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import historiqueView from '../views/historiqueView.vue'
import queuCallView from '../views/queuCallView.vue'
import publicationView from '../views/publicationView.vue'
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
      path: '/publication',
      name: 'publication',
      component: publicationView,
    },
    {
      path: '/queuecall',
      name: 'queue',
      component: queuCallView,
    },
  ],
})

export default router
