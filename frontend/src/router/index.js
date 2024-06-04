import { createRouter, createWebHistory } from 'vue-router'
import DeliveryPage from '../components/DeliveryPage.vue'
import ProfilePage from '../components/ProfilePage.vue'
import TrackingPage from '../components/TrackingPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/delivery'
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage
  },
  {
    path: '/tracking',
    name: 'tracking',
    component: TrackingPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
