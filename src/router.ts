import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
import loginVue from './layouts/login.vue'
import loginPageVue from './pages/login/loginPages.vue'
import mitraVue from './pages/login/mitra.vue'
import regsiterPageVue from './pages/register/registerPages.vue'
import correctionVue from './pages/default/correction.vue'
import foodbeverageVue from './pages/default/foodbeverage.vue'
import promotodayVue from './pages/default/promotoday.vue'
import laundryVue from './pages/default/laundry.vue'
import customerserviceVue from './pages/default/customerservice.vue'
import RouteType from './types/route'

export const routes: RouteType[] = [
  {
    path: '/admin',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: 'home',
      icon: 'home',
    },
  },
  {
    path: '/mitra',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/user',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/register',
    component: regsiterPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/correction',
    component: correctionVue,
    meta: {
      layout: defaultVue,
      title: 'Mini Market - Lingian Hotel',
      label: 'mini market',
      icon: 'store',
    },
  },
  {
    path: '/foodbeverage',
    component: foodbeverageVue,
    meta: {
      layout: defaultVue,
      title: 'Food & Beverage - Lingian Hotel',
      label: 'food & beverage',
      icon: 'emoji_food_beverage',
    },
  },
  {
    path: '/promotoday',
    component: promotodayVue,
    meta: {
      layout: defaultVue,
      title: 'Promo Today - Lingian Hotel',
      label: 'promo today',
      icon: 'percent',
    },
  },
  {
    path: '/laundry',
    component: laundryVue,
    meta: {
      layout: defaultVue,
      title: 'Laundry - Lingian Hotel',
      label: 'laundry',
      icon: 'local_laundry_service',
    },
  },
  {
    path: '/customerservice',
    component: customerserviceVue,
    meta: {
      layout: defaultVue,
      title: 'Customer Service - Lingian Hotel',
      label: 'customer service',
      icon: 'support_agent',
    },
  },
  {
    path: '/logout',
    component: '',
    meta: {
      layout: '',
      title: 'Logout - Lingian Hotel',
      label: 'logout',
      icon: 'logout',
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
