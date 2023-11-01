<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { routes } from '../router'
  import { useHead } from '@vueuse/head'

  const leftDrawerOpen = ref(false)
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const route = useRoute()
  const router = useRouter()
  const search = ref('')
  useHead({
    title: 'Your Page Title',
    // other meta tags or properties
  })
</script>

<template>
  <div class="my-bg">
    <q-layout view="lHh lpR fFf" class="text-white max-h-screen min-h-screen">
      <q-header reveal class="bg-transparent border-0 border-transparent">
        <q-toolbar class="flex items-center justify-between">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="text-white" />

          <q-toolbar-title class="text-capitalize font-bold">
            {{ route.meta.label }}
          </q-toolbar-title>
          <div class="flex items-center gap-4">
            <q-btn dense flat round icon="chat" @click="toggleLeftDrawer" class="text-white" />
            <q-btn dense flat round icon="person" @click="toggleLeftDrawer" class="text-white" />
            <q-btn
              dense
              flat
              round
              icon="shopping_cart"
              @click="toggleLeftDrawer"
              class="text-white" />

            <q-form>
              <q-input
                outlined
                v-model="search"
                label="Search"
                for="search"
                type="search"
                color="dark"
                bg-color="white"
                class="">
                <template v-slot:append class="">
                  <q-btn dense flat icon="search" color="green" rounded />
                </template>
              </q-input>
            </q-form>
          </div>
        </q-toolbar>

        <q-toolbar inset>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <div class="flex items-start gap-2">
              <q-btn class="text-white" label="1" color="green" rounded></q-btn>
              <div class="flex flex-col items-start">
                <p>Add to Cart</p>
                <p class="text-gray-400">choose your food</p>
              </div>
            </div>

            <div
              class="h-[2px] w-14 bg-[#20A95A] rounded-2xl border-2 border-[#20A95A] z-10 shadow-md"></div>
            <div class="flex items-start gap-2">
              <q-btn
                class="text-gray-400"
                label="2"
                color="dark"
                text-color="grey-13"
                rounded></q-btn>
              <div class="flex flex-col items-start">
                <p class="text-gray-400">Checkout</p>
                <p class="text-gray-400">choose your food</p>
              </div>
            </div>
          </q-breadcrumbs>
        </q-toolbar>
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
              <template v-if="route.meta.label">
                <q-item
                  clickable
                  :active="route.meta.label === 'Outbox'"
                  v-ripple
                  @click="router.push(route.path)">
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
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="flex items-center justify-center h-screen">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
  .my-bg {
    position: absolute;
    top: 0;
    left: 0;
    background-position-y: 30%;
    width: 100%;
    background-image: url('src/assets/img/login.png');
    background-size: cover;
    z-index: -1; /* Move the background behind other content */
  }

  .my-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('src/assets/img/login.png');
    background-size: cover;
    background-position-y: 50%;
    filter: brightness(50%); /* Apply the brightness filter */
    z-index: -2; /* Move the filtered background even further behind */
  }

  // .my-bg::before {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 60%;
  //   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   top: 0;
  // }

  // .my-bg::after {
  //   content: '';
  //   display: block;
  //   width: 100%;
  //   height: 40%;
  //   background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  //   position: absolute;
  //   bottom: 0;
  // }
</style>
