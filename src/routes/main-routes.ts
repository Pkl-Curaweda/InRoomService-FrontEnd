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

export default mainRoutes
