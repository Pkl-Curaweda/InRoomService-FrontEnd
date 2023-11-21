import RouteType from 'src/types/route'

// pages
import loginPagesVue from 'src/pages/blank/login.vue'
import profilePageVue from 'src/pages/profile/profilepage.vue'
import dashboardUserVue from 'src/pages/mainPages/index.vue'
import minimarketUserVue from 'src/pages/default/minimarket.vue'
import foodBeverageUserVue from 'src/pages/default/foodbeverage.vue'
import promoTodayUserVue from 'src/pages/default/promotoday.vue'
import laundryUserVue from 'src/pages/default/laundry.vue'
import about from 'src/pages/about/about.vue'

//components
import loginVue from '../layouts/login.vue'
import navAbout from '../layouts/about.vue'
import customerVue from '../layouts/customer.vue'
import cardLaundry from '../default/laundry.vue'

export const mainRoutes: RouteType[] = [
  {
    path: '/admin',
    component: loginPagesVue, // dashboard
    // name: 'Admin',
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/mitra',
    component: loginPagesVue, // dashboard
    // name: 'Mitra',
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/profile',
    component: profilePageVue, // dashboard
    // name: 'Profile',
    meta: {
      layout: navAbout,
      title: 'Profile - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/home',
    component: dashboardUserVue, // dashboard
    // name: 'Home',
    meta: {
      layout: navAbout,
      title: 'Home - Lingian Hotel',
      label: 'Home',
      icon: 'home',
    },
  },
  {
    path: '/minimarket',
    component: minimarketUserVue,
    // name: 'Minimarket',
    meta: {
      layout: customerVue,
      title: 'Mini Market - Lingian Hotel',
      label: 'mini market',
      icon: 'store',
    },
  },
  {
    path: '/foodbeverage',
    component: foodBeverageUserVue,
    // name: 'Food & Beverage',
    meta: {
      layout: customerVue,
      title: 'Food & Beverage - Lingian Hotel',
      label: 'food & beverage',
      icon: 'fastfood',
    },
  },
  {
    path: '/promotoday',
    component: promoTodayUserVue,
    // name: 'Promo Today',
    meta: {
      layout: customerVue,
      title: 'Promo Today - Lingian Hotel',
      label: 'promo today',
      icon: 'percent',
    },
  },
  {
    path: '/laundry',
    component: laundryUserVue,
    // name: 'Laundry',
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
    // name: 'About',
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
  // name:
  //   meta: {
  //     layout: '',
  //     title: 'Logout - Lingian Hotel',
  //     label: 'logout',
  //     icon: 'logout',
  //   },
  // },
]

export default mainRoutes
