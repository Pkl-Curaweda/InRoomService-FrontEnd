import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
import loginVue from './layouts/login.vue'
import navAbout from './layouts/about.vue'
import indexUser from './pages/customer/index.vue'
import loginPageVue from './pages/login/loginPages.vue'
import mitraVue from './pages/login/mitra.vue'
import regsiterPageVue from './pages/register/registerPages.vue'
import correctionVue from './pages/default/correction.vue'
import foodbeverageVue from './pages/default/foodbeverage.vue'
import promotodayVue from './pages/default/promotoday.vue'
import laundryVue from './pages/default/laundry.vue'
import customerserviceVue from './pages/default/customerservice.vue'
import RouteType from './types/route'
import indexVue from './pages/index.vue'
import about from './pages/about/about.vue'

export const routes: RouteType[] = [
  {
    path: '/admin',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/mitra',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/user',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/user/home',
    component: indexUser, // dashboard
    meta: {
      layout: navAbout,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/register',
    component: regsiterPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Register - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/mitra/register',
    component: regsiterPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Register - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/',
    component: indexVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: 'home',
      icon: 'home',
    },
  },
  {
    path: '/minimarket',
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
      label: 'Laundry',
      // chnage name label to laundry
      icon: 'local_laundry_service',
    },
  },
  {
    // create path about
    path: '/about',
    component: about,
    meta: {
      layout: navAbout,
      title: 'About - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  // {
  //   path: '/logout',
  //   component: '',
  //   meta: {
  //     layout: '',
  //     title: 'Logout - Lingian Hotel',
  //     label: 'logout',
  //     icon: 'logout',
  //   },
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[],
})

router.beforeEach((_to, _from, next) => {
  next()
})
export default router
