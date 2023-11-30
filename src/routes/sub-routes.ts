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
import partnersVue from '../pages/admin/pendingpartners.vue'
import mitraEditVue from '../pages/mitra/mitraEdit.vue'
import detailOrderanVue from '../pages/mitra/detailOrders.vue'
import detailPartnerVue from '../pages/admin/detail.vue'

import estimatedVue from '../pages/estimated/estimated.vue'
// layout
import navAbout from '../layouts/about.vue'
import loginVue from '../layouts/login.vue'
import checkoutLayout from '../layouts/checkout.vue'
import mitraLayout from '../layouts/mitra.vue'
import adminLayout from '../layouts/admin.vue'

export const subRoutes: RouteType[] = [
  {
    path: '/servicecenter',
    component: about,
    // name: '/servicecenter',
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
    // name: '/admin/home',
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
    // name: '/admin/foodbeverage',
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
    // name: '/admin/minimarket',
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
    // name: '/admin/partners',
    meta: {
      layout: adminLayout,
      title: 'Partners - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/admin/partners/:id',
    component: detailPartnerVue, // dashboard
    // name: '/admin/partners',
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
    // name: '/mitra/register',
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
    // name: '/mitra/home',
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
    // name: '/mitra/upload',
    meta: {
      layout: mitraLayout,
      title: 'Input - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    // create path about
    path: '/mitra/edit/:id',
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
    // name: '/mitra/minimarket',
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
    // name: '/mitra/customer',
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
    // name: '/mitra/history',
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
    // name: '/checkout/minimarket',
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
    // name: '/checkout/foodbeverage',
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
    // name: '/checkout/laundry',
    meta: {
      layout: checkoutLayout,
      title: 'Mini Market - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/estimated/minimarket',
    component: estimatedVue,
    meta: {
      layout: navAbout,
      title: 'Estimated - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/estimated/foodbeverage',
    component: estimatedVue,
    meta: {
      layout: navAbout,
      title: 'Estimated - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/estimated/laundry',
    component: estimatedVue,
    meta: {
      layout: navAbout,
      title: 'Estimated - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
]
