<template>
  <div>
    <q-layout view="lHh lpR fFf">
      <q-header reveal class="bg-[#069550] text-white py-3">
        <q-toolbar>
          <q-toolbar-title class="text-capitalize font-semibold">
            <!-- {{ route.meta.label }} -->
            <q-avatar>
              <img src="../assets/img/lingian-logo-colored.png" alt="" class="opacity-100" />
            </q-avatar>
          </q-toolbar-title>

          <router-link to="/">
            <q-btn flat round icon="o_mail" class="opacity-80 hover:opacity-100" />
          </router-link>

          <router-link to="/">
            <q-btn flat round icon="o_account_circle" class="opacity-80 hover:opacity-100" />
          </router-link>
        </q-toolbar>
      </q-header>

      <q-page-container>
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
