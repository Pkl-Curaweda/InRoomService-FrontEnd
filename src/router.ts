import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
import loginVue from './layouts/login.vue'
import indexUser from './pages/mainPages/index.vue'
import loginPageVue from './pages/login/loginPages.vue'
import mitraVue from './pages/login/mitra.vue'
import regsiterPageVue from './pages/register/registerPages.vue'
import minimarketVue from './pages/default/minimarket.vue'
import foodbeverageVue from './pages/default/foodbeverage.vue'
import promotodayVue from './pages/default/promotoday.vue'
import laundryVue from './pages/default/laundry.vue'
import customerserviceVue from './pages/default/customerservice.vue'
import RouteType from './types/route'
import indexVue from './pages/index.vue'
// Tambahan untuk page payment doang
import customerVue from './layouts/customer.vue'
import about from './pages/about/about.vue'
import profilePageVue from './pages/profile/profilepage.vue'
import mitraPageVue from './pages/mitra/mitrapages1.vue'

// import admin payment pages
import paymentfoodVue from './pages/default/foodAdmin.vue'
import paymentminimarketVue from './pages/default/minimarketadmin.vue'

// navbar utama
import navAbout from './layouts/about.vue'

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
    path: '/admin/home',
    component: indexUser, // dashboard
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
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
    path: '/mitra/home',
    component: indexUser, // dashboard
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/profile',
    component: profilePageVue, // dashboard
    meta: {
      layout: navAbout,
      title: 'Profile - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/',
    component: loginPageVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/home',
    component: indexUser, // dashboard
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
      label: 'Home',
      icon: 'home',
    },
  },

  {
    path: '/tes',
    component: indexVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/minimarket',
    component: minimarketVue,
    meta: {
      layout: customerVue,
      title: 'Mini Market - Lingian Hotel',
      label: 'mini market',
      icon: 'store',
    },
  },
  {
    path: '/foodbeverage',
    component: foodbeverageVue,
    meta: {
      layout: customerVue,
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
      layout: customerVue,
      title: 'Laundry - Lingian Hotel',
      // label: 'laundry',
      label: 'laundry',
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
  {
    // create path about
    path: '/mitra/input',
    component: mitraPageVue,
    meta: {
      layout: navAbout,
      title: 'About - Lingian Hotel',
      label: '',
      icon: '',
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
  // Tambahan untuk page minimarket admin doang
  {
    path: '/paymenttest',
    component: paymentfoodVue,
    meta: {
      layout: navAbout,
      title: 'Payment - Lingian Hotel',
      label: 'Admin',
      icon: 'support_agent',
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
