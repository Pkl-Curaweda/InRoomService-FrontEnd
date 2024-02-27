import { RouteRecordRaw } from 'vue-router';
import AdminRoutes from './admin.router';
import MitraRoutes from './mitra.router';
import UserRoutes from './user.router';
import CoRoutes from './co.routes';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue'),
    meta: {
      title: 'Dashboard',
      protected: true
    }
  }],
  },
  {
    path: '/',
    component: () => import('layouts/CustomerLayout.vue'),
    children: UserRoutes,
  },
  {
    path: '/checkout',
    component: () => import('layouts/CoLayout.vue'),
    children: CoRoutes,
  },
  {
    path: '/home',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/payment',
    component: () => import('layouts/CoLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/checkout/PaymentPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/blank/LoginPage.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdmLayout.vue'),
    children: AdminRoutes,
  },
  {
    path: '/admin/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/blank/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/admin/home',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/mitra',
    component: () => import('layouts/MitraLayout.vue'),
    children: MitraRoutes,
  },
  {
    path: '/mitra/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/blank/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/mitra/home',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },
    ],
  },
  // {
  //   path: '/login',
  //   component: () => import('/layouts/LoginLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/blank/LoginPage.vue') },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
