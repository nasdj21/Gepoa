import { createRouter, createWebHistory } from 'vue-router'

const MapView = () => import('../views/MapView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'Map', component: MapView }],
})

export default router
