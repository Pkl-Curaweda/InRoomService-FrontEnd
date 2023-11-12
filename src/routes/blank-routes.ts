import RouteType from 'src/types/route'
import loginPagesVue from 'src/pages/blank/login.vue'
import forbiddenPageVue from 'src/pages/blank/not-allowed.vue'
import notFoundPageVue from 'src/pages/blank/not-found.vue'

// layout
import loginVue from '../layouts/login.vue'

const blankRoutes: RouteType[] = [
  {
    path: '/',
    component: loginPagesVue, // dashboard
    meta: {
      layout: loginVue,
      title: 'Login - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
  {
    path: '/forbidden',
    component: forbiddenPageVue, // dashboard
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
    meta: {
      layout: loginVue,
      title: 'Not Found - Lingian Hotel',
      label: '',
      icon: '',
    },
  },
]

export default blankRoutes
