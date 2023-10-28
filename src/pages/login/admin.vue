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

    <p class="mt-8" v-if="$route.path !== '/user'">
      Don't have an account? <a class="text-[#D1CB2A]" href="">Create an account</a>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ButtonVue from '../../components/Button.vue'

  const username = ref('')
  const pw = ref('')
  const ph = ref('')
  const dense = ref(false)
</script>
