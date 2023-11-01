<template>
  <div class="flex items-center flex-col justify-center">
    <img src="../../assets/img/logoLingian.png" alt="" />

    <q-form class="flex items-center flex-col mt-3 gap-4">
      <!-- <q-input
        rounded
        standout
        bottom-slots
        v-model="username"
        label="Username"
        placeholder="Enter Username Here"
        for="username"
        bg-color="white"
        color="dark"
        :dense="dense" /> -->
      <q-input
        rounded
        outlined
        v-model="username"
        color="dark"
        bg-color="white"
        label="Username"
        for="username"
        placeholder="Enter Username Here">
      </q-input>
      <q-input
        rounded
        outlined
        v-model="pw"
        color="dark"
        bg-color="white"
        label="Password"
        for="password"
        type="password">
      </q-input>
      <q-btn unelevated rounded color="green" label="Login" text-color="dark" class="px-8" />
    </q-form>

    <p class="mt-8" v-if="$route.path === '/mitra'">
      Don't have an account?
      <a class="text-[#D1CB2A]" href="/mitra/register">Create an account</a>
    </p>

    <card-menu tanggal="9" namaToko="bagong darat" jam="sekian" iconName="close" />
    <card-user
      gambarProduk="src\assets\img\login.png"
      namaProduk="Bakso baghdad"
      descProduk="dibuat dari daging onta asli"
      hargaProduk="20000" />
    <card-mitra
      gambarProduk="src\assets\img\login.png"
      namaProduk="Bakso baghdad"
      descProduk="dibuat dari daging onta asli"
      hargaProduk="20000" />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ButtonVue from '../../components/Button.vue'
  import CardMitra from 'src/components/CardMitra.vue'
  import CardUser from 'src/components/CardUser.vue'
  import CardMenu from 'src/components/CardMenu.vue'
  import { useRoute } from 'vue-router'

  const username = ref('')
  const pw = ref('')
  const ph = ref('')
  const dense = ref(false)

  const $route = useRoute()

  const getRegistrationLink = computed(() => {
    if ($route.path.startsWith('/admin')) {
      return '/admin/register'
    } else if ($route.path.startsWith('/mitra')) {
      return '/mitra/register'
    } else {
      // Set a default link if not in the '/admin' or '/mitra' path
      return '/default/register'
    }
  })
</script>
