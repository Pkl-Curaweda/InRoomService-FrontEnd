import RouteType from 'src/types/route'
import loginPagesVue from 'src/pages/blank/login.vue'
import forbiddenPageVue from 'src/pages/blank/not-allowed.vue'
import notFoundPageVue from 'src/pages/blank/not-found.vue'

// layout
import loginVue from '../layouts/login.vue'

const blankRoutes: RouteType[] = [
  {
    path: '/login',
    component: loginPagesVue, // dashboard
    // name: '/login',
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: 'Login',
      icon: '',
    },
  },
  {
    path: '/forbidden',
    component: forbiddenPageVue, // dashboard
    // name: '/forbidden',
    meta: {
      layout: loginVue,
      title: 'Not Allowed - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: notFoundPageVue, // dashboard
    // name: '/:pathMatch(.*)*',
    meta: {
      layout: loginVue,
      title: 'Not Found - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
]

export default blankRoutes
