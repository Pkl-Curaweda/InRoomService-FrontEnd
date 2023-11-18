<template>
  <div class="flex items-center flex-col justify-center gap-10 w-full">
    <img src="../../assets/img/logoLingian.png" class="md:w-52" alt="" />

    <q-form class="flex items-center flex-col mt-3 gap-6" @submit.prevent="login">
      <!-- <q-input
        rounded
        standout
        bottom-slots
        v-model="Email"
        label="Email"
        placeholder="Enter Email Here"
        for="Email"
        bg-color="white"
        color="dark"
        :dense="dense" /> -->
      <q-input
        rounded
        outlined
        v-model="email"
        color="dark"
        bg-color="white"
        label="Email"
        for="email"
        placeholder="Enter Email Here"
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

<script lang="ts">
  import { ref, computed } from 'vue'
  import ButtonVue from '../../components/Button.vue'
  import CardMitra from 'src/components/CardMitra.vue'
  import CardUser from 'src/components/CardUser.vue'
  import CardMenu from 'src/components/CardMenu.vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  export default {
    data() {
      return {
        email: '',
        pw: '',
        ph: '',
        dense: false,
      }
    },
    computed: {
      $route() {
        return useRoute()
      },
    },
    methods: {
      async login() {
        try {
          const response = await axios.post(
            'http://localhost:8080/auth/login',
            {
              email: this.email,
              password: this.pw,
            },
            {
              withCredentials: true,
            }
          )

          const token = response.data.data.accessToken
          console.log(token)

          localStorage.setItem('token', token)

          this.$router.push('/mitra/upload')
        } catch (error) {
          console.error('Login failed!', error.message)
        }
      },
    },
  }
</script>
