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

  useHead({
    title: 'Your Page Title',
    // other meta tags or properties
  })
</script>

<template>
  <div class="my-bg">
    <q-layout view="lHh lpR fFf" class="text-white max-h-screen min-h-screen">
      <q-header reveal class="bg-transparent border-0 border-transparent">
        <q-toolbar class="flex items-center justify-end">
          <q-btn
            v-if="$route.path === '/'"
            dense
            flat
            round
            icon="qr_code_scanner"
            @click="toggleLeftDrawer"
            class="text-white" />
        </q-toolbar>
      </q-header>

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
