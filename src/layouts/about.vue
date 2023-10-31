<template>
  <div class="q-pa-md bg-[#DADADA]">
    <!-- <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>
    </q-layout> -->
    <q-layout view="lHh lpR fFf">
      <q-header reveal class="bg-[#069550] text-white">
        <q-toolbar>
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
      </q-header>

      <q-page-container class="flex items-center justify-start flex-col h-screen">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
</script>

<style lang="scss" scoped></style>
