import { createRouter, createWebHashHistory } from 'vue-router'
import About from '@/views/About.vue'
import Launchess from '@/views/Launchess.vue'
import LaunchesDetails from '@/views/LaunchesDetails.vue'
import Show from '@/views/Show.vue'
import FaviCard from '@/views/faviCard.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'launchess',
      component: Launchess,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/details',
      name: 'details',
      component: LaunchesDetails,
    },
    {
      path: '/show/:flight_number/:mname',
      name: 'show',
      component: Show,
    },
    {
      path:'/favcard',
      name:'favcard',
      component: FaviCard
    }
  ],
})

export default router
