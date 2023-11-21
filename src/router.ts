import { RouteRecordName, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import defaultVue from './layouts/default.vue'
import indexUser from './pages/mainPages/index.vue'
import minimarketVue from './pages/default/minimarket.vue'
import foodbeverageVue from './pages/default/foodbeverage.vue'
import promotodayVue from './pages/default/promotoday.vue'
import laundryVue from './pages/default/laundry.vue'
import RouteType from './types/route'
import about from './pages/about/about.vue'
import profilePageVue from './pages/profile/profilepage.vue'
import mitraPageVue from './pages/mitra/mitraUpload.vue'
import adminPageVue from './pages/admin/adminpages1.vue'
// import admin payment pages
import foodAdminVue from './pages/default/foodAdmin.vue'
import marketAdminVue from './pages/default/minimarketadmin.vue'

// import checkout
import paymentFoodVue from './pages/checkout/paymentFood.vue'
import paymentMinimarketVue from './pages/checkout/paymentminimarket.vue'
import paymentLaundryVue from './pages/checkout/paymentLaundry.vue'

// import layout utama
import customerVue from './layouts/customer.vue'
import navAbout from './layouts/about.vue'

import ListPartnerGoodsVue from './pages/admin/PartnerGoods.vue'

import blankRoutes from './routes/blank-routes'
import mainRoutes from './routes/main-routes'
import subRoutes from './routes/sub-routes'

// pages mitra
import menuMitra from './pages/mitra/menumitra.vue'
export const routes: RouteType[] = [
  {
    path: '/home',
    component: indexUser, // dashboard
    name: '/home',
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
    name: '/minimarket',
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
    name: '/foodbeverage',
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
    name: '/promotoday',
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
    name: '/laundry',
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
    name: '/about',
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
      title: 'Service Center - Lingian Hotel',
      label: 'Service Center',
      icon: 'support_agent',
    },
  },

  {
    // buat create path list partner goods
    path: '/partnergoods',
    component: ListPartnerGoodsVue,
    name: '/partnergoods',
    meta: {
      layout: navAbout,
      title: 'List of Partner Goods - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    // create path about
    path: '/admin/acc',
    component: adminPageVue,
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

const isAuthenticated = false

router.beforeEach((to, from, next) => {
  // if (to.name !== '/login' && !isAuthenticated) next({ path: '/login' })
  // if (to.name === '/login' && isAuthenticated) next({ path: '/home' })
  // if (to.name !== '/admin' && !isAuthenticated) next({ path: '/admin' })
  // if (to.name === '/admin' && isAuthenticated) next({ path: '/admin/home' })
  // if (to.name !== '/mitra' && !isAuthenticated) next({ path: '/mitra' })
  // if (to.name === '/mitra' && isAuthenticated) next({ path: '/mitra/home' })
  next()
})
export default router
