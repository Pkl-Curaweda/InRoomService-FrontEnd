import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
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
import about from './pages/about/about.vue'
import profilePageVue from './pages/profile/profilepage.vue'
import mitraPageVue from './pages/mitra/mitrapages1.vue'

// import admin payment pages
import foodAdminVue from './pages/default/foodAdmin.vue'
import marketAdminVue from './pages/default/minimarketadmin.vue'

// import checkout
import paymentFoodVue from './pages/checkout/paymentFood.vue'
import paymentMinimarketVue from './pages/checkout/paymentminimarket.vue'
import paymentLaundryVue from './pages/checkout/paymentLaundry.vue'

// import layout utama
import customerVue from './layouts/customer.vue'
import loginVue from './layouts/login.vue'
import navAbout from './layouts/about.vue'
import checkoutLayout from './layouts/checkout.vue'

import blankRoutes from './routes/blank-routes'
import mainRoutes from './routes/main-routes'
import subRoutes from './routes/sub-routes'
export const routes: RouteType[] = [
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
      icon: 'fastfood',
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...blankRoutes, ...mainRoutes, ...subRoutes] as unknown as RouteRecordRaw[],
})

router.beforeEach((_to, _from, next) => {
  next()
})
export default router
