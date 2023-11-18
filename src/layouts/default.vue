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
  <div class="sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] justify-center mx-auto">
    <q-layout view="lHh lpR fFf">
      <q-header elevated class="bg-white text-black">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title class="text-capitalize font-bold">
            {{ route.meta.label }}
          </q-toolbar-title>

          <router-link to="/">
            <q-btn flat round icon="o_mail" class="opacity-50 hover:opacity-100" />
          </router-link>

          <router-link to="/">
            <q-btn flat round icon="o_notifications" class="opacity-50 hover:opacity-100" />
          </router-link>

          <router-link to="/">
            <q-btn flat round icon="o_account_circle" class="opacity-50 hover:opacity-100" />
          </router-link>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated :width="240">
        <q-scroll-area class="fit">
          <div class="flex flex-col items-center p-2 mb-4">
            <q-btn flat round color="dark" icon="close" @click="toggleLeftDrawer" class="ms-auto" />
            <q-img src="../assets/img/lingian-logo.png" class="w-52" />
          </div>
          <q-list>
            <template v-for="(route, index) in routes" :key="index">
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
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="px-4">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
