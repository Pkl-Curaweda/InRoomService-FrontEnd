import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
import indexVue from './pages/default/index.vue'
import correctionVue from './pages/default/correction.vue'
import RouteType from './types/route'

export const routes: RouteType[] = [
  {
    path: '/',
    component: indexVue, // dashboard
    meta: {
      layout: defaultVue,
      title: 'Dashboard - Lingian Hotel',
      label: 'dashboard',
      icon: 'dashboard',
    },
  },
  {
    path: '/correction',
    component: correctionVue,
    meta: {
      layout: defaultVue,
      title: 'Correction - Lingian Hotel',
      label: 'correction',
      icon: 'tune',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[],
})

router.beforeEach((_to, _from, next) => {
  next()
})
export default router
