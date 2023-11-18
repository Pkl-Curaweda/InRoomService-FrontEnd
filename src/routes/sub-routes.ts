import RouteType from 'src/types/route'

// pages
import dashboardUserVue from 'src/pages/mainPages/index.vue'
import regsiterPageVue from '../pages/register/registerPages.vue'

import paymentMinimarketVue from '../pages/checkout/paymentminimarket.vue'
import paymentFoodVue from '../pages/checkout/paymentFood.vue'
import paymentLaundryVue from '../pages/checkout/paymentLaundry.vue'

import mitraPageVue from '../pages/mitra/mitraUpload.vue'
import about from 'src/pages/about/about.vue'
import menuMitra from '../pages/mitra/menumitra.vue'
import menuOrderan from '../pages/mitra/menuOrderan.vue'
import historyPageVue from '../pages/mitra/history.vue'
import adminFoodBeverage from '../pages/admin/foodAdmin.vue'
import adminMinimarket from '../pages/admin/minimarketadmin.vue'
import partnersVue from '../pages/admin/partners.vue'
import mitraEditVue from '../pages/mitra/mitraEdit.vue'
import detailOrderanVue from '../pages/mitra/detailOrders.vue'

// layout
import navAbout from '../layouts/about.vue'
import loginVue from '../layouts/login.vue'
import checkoutLayout from '../layouts/checkout.vue'
import mitraLayout from '../layouts/mitra.vue'
import adminLayout from '../layouts/admin.vue'

const subRoutes: RouteType[] = [
  {
    path: '/servicecenter',
    component: about,
    meta: {
      layout: navAbout,
      title: 'Service Center - Lingian Hotel',
      label: 'Service Center',
      icon: 'support_agent',
    },
  },
  {
    path: '/admin/home',
    component: dashboardUserVue, // dashboard
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/foodbeverage',
    component: adminFoodBeverage, // dashboard
    meta: {
      layout: adminLayout,
      title: 'Food & Beverage - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/minimarket',
    component: adminMinimarket, // dashboard
    meta: {
      layout: adminLayout,
      title: 'Mini Market - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/partners',
    component: partnersVue, // dashboard
    meta: {
      layout: adminLayout,
      title: 'Partners - Lingian Hotel',
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
    component: dashboardUserVue, // dashboard
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
      label: 'Home',
      icon: 'home',
    },
  },
  {
    // create path about
    path: '/mitra/upload',
    component: mitraPageVue,
    meta: {
      layout: mitraLayout,
      title: 'Input - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    // create path about
    path: '/mitra/edit',
    component: mitraEditVue,
    meta: {
      layout: mitraLayout,
      title: 'Edit - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/mitra/minimarket',
    component: menuMitra,
    meta: {
      layout: mitraLayout,
      title: 'Minimarket - Lingian Hotel',
      label: 'Mini market',
      icon: 'store',
    },
  },
  {
    path: '/mitra/customer',
    component: menuOrderan,
    meta: {
      layout: mitraLayout,
      title: 'Minimarket - Lingian Hotel',
      label: 'Customer Order',
      icon: 'shopping_cart',
    },
  },
  {
    path: '/mitra/customer/order/',
    component: detailOrderanVue,
    meta: {
      layout: mitraLayout,
      title: 'Minimarket - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/mitra/history',
    component: historyPageVue,
    meta: {
      layout: mitraLayout,
      title: 'Minimarket - Lingian Hotel',
      label: 'History',
      icon: 'history',
    },
  },

  {
    path: '/checkout/minimarket',
    component: paymentMinimarketVue,
    meta: {
      layout: checkoutLayout,
      title: 'Mini Market - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/checkout/foodbeverage',
    component: paymentFoodVue,
    meta: {
      layout: checkoutLayout,
      title: 'Mini Market - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/checkout/laundry',
    component: paymentLaundryVue,
    meta: {
      layout: checkoutLayout,
      title: 'Mini Market - Lingian Hotel',
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
]

export default subRoutes
