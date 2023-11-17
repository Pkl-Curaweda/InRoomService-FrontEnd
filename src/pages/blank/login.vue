<template>
  <div class="flex items-center flex-col justify-center gap-10 w-full">
    <img src="../../assets/img/logoLingian.png" class="md:w-52" alt="" />

    <q-form class="flex items-center flex-col mt-3 gap-6">
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
        outlined
        rounded
        v-model="username"
        color="dark"
        bg-color="white"
        label="Username"
        for="username"
        placeholder="Enter Username Here"
        clear-icon="backspace"
        class="md:w-80 w-60 drop-shadow-sm">
      </q-input>
      <q-input
        rounded
        outlined
        v-model="pw"
        color="dark"
        bg-color="white"
        label="Password"
        for="password"
        type="password"
        class="md:w-80 w-60 drop-shadow-sm">
      </q-input>
      <q-btn
        text-color="dark"
        unelevated
        size="md"
        rounded
        padding="sm"
        color="green"
        label="login"
        class="px-20 w-40 font-semibold items-center text-semibold">
      </q-btn>
    </q-form>

    <p class="mt-8" v-if="$route.path === '/mitra'">
      Don't have an account?
      <a class="text-[#D1CB2A]" href="/mitra/register">Create an account</a>
    </p>
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
