<template>
  <div class="justify-center mx-auto">
    <q-layout view="lHh lpR fFf">
      <q-header>
        <q-toolbar class="bg-[#069550] text-white pt-1" v-if="$route.path !== '/mitra/minimarket'">
          <q-toolbar-title class="text-capitalize font-semibold">
            <!-- {{ route.meta.label }} -->
            <q-avatar>
              <img src="../assets/img/lingian-logo-colored.png" alt="" class="opacity-100" />
            </q-avatar>
          </q-toolbar-title>

          <router-link to="/" v-if="$route.path !== '/about'">
            <q-btn flat round icon="o_notifications" class="opacity-80 hover:opacity-100" />
          </router-link>

          <router-link to="/">
            <q-btn flat round icon="o_mail" class="opacity-80 hover:opacity-100" />
          </router-link>

          <router-link to="/">
            <q-btn flat round icon="o_account_circle" class="opacity-80 hover:opacity-100" />
          </router-link>
        </q-toolbar>
        <div class="bg-white text-black">
          <q-toolbar-title
            class="text-capitalize font-semibold mx-4"
            v-if="$route.path == '/mitra/minimarket'">
            Minimarket
          </q-toolbar-title>
          <q-toolbar class="flex items-center justify-between">
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="text-black" />
            <!-- <q-btn
                dense
                flat
                icon="add"
                href="/mitra/input"
                :class="{
                  'text-black': $route.path !== '/mitra/input',
                  ' border-b-4 border-b-green-500': $route.path === '/mitra/input',
                }" /> -->
            <!-- <q-btn
                dense
                flat
                icon="history"
                href="/mitra/customer/history"
                :class="{
                  'text-black': $route.path !== '/mitra/customer',
                  ' border-b-4 border-b-green-500': $route.path === '/mitra/customer/history',
                }" /> -->
          </q-toolbar>

          <q-toolbar
            class="flex flex-col w-screen justify-center"
            v-if="$route.path == '/mitra/input'">
            <div
              active-color="white"
              style="font-size: 16px"
              class="flex flex-row items-center mt-6 flex-nowrap">
              <div class="flex items-start gap-2 flex-nowrap">
                <q-btn
                  class="text-gray-400"
                  label="1"
                  color="dark"
                  text-color="grey-13"
                  rounded></q-btn>
                <div class="flex flex-col items-start">
                  <p class="text-gray-400 text-sm">Add to Store</p>
                  <p class="text-gray-400 text-sm">Add Your Item</p>
                </div>
              </div>

              <div
                class="h-[2px] w-12 bg-[#20A95A] rounded-2xl border-2 border-[#20A95A] z-10 shadow-md"></div>
              <div class="flex items-start gap-2 flex-nowrap">
                <q-btn class="text-white" label="2" color="green" rounded></q-btn>
                <div class="flex flex-col items-start">
                  <p class="text-sm">Waiting for Approval</p>
                  <p class="text-gray-400 text-sm">Wait For Verification</p>
                </div>
              </div>
            </div>
          </q-toolbar>
        </div>
      </q-header>
      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        overlay
        elevated
        :width="240"
        class="text-white bg-[#9F9F9F]">
        <q-scroll-area class="fit">
          <div class="flex flex-col items-center p-2 mb-4">
            <q-btn
              flat
              round
              color="white"
              icon="close"
              size="60"
              @click="toggleLeftDrawer"
              class="ms-auto z-10" />
            <q-img src="../assets/img/logoLingian.png" class="w-40" />
          </div>
          <q-list>
            <template v-for="(route, index) in routes" :key="index">
              <!-- Only display routes with a non-empty label in the sidebar -->
              <template v-if="route.meta.label && route.path !== '/promotoday'">
                <q-item
                  clickable
                  :active="route.meta.label === 'Outbox'"
                  v-ripple
                  @click="router.push('/admin' + route.path)">
                  <q-item-section avatar>
                    <q-icon :name="'o_' + route.meta.icon" />
                  </q-item-section>
                  <q-item-section>
                    <p class="text-bold text-capitalize">
                      {{ route.meta.label }}
                    </p>
                  </q-item-section>
                </q-item>
              </template>
            </template>
            <q-item clickable v-ripple @click="$router.push('/admin/partners')">
              <q-item-section avatar>
                <q-icon name="o_checklist" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Pending</p>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="o_logout" />
              </q-item-section>
              <q-item-section>
                <p class="text-bold">Logout</p>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container class="">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, computed, watch } from 'vue'
  import { mainRoutes } from '../routes/main-routes'
  import { routes } from 'src/router'
  import { subRoutes } from '../routes/sub-routes'
  import api from 'src/AxiosInterceptors'
  import { Cookies } from 'quasar'

  export default {
    data() {
      return {
        routes: routes,
        leftDrawerOpen: false,
        router: useRouter(),
        search: '',
      }
    },
    methods: {
      toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen
      },

      async logout() {
        const refreshToken = Cookies.get('refreshToken')

        try {
          await api.get(
            '/auth/logout',
            // { req: Cookies.get('refreshToken') },
            { withCredentials: true }
          )
          localStorage.removeItem('token')

          this.router.push('/admin')
        } catch (error) {
          console.error('Logout failed', error.message)
        }
      },
    },
    computed: {
      // Add computed properties here if needed
    },
    watch: {
      // Add watchers here if needed
    },
  }
</script>

<style lang="scss" scoped></style>
