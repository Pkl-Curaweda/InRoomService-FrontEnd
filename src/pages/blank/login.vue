<template>
  <div class="flex items-center flex-col justify-center">
    <img src="../../assets/img/logoLingian.png" alt="" />

    <q-form class="flex items-center flex-col mt-3 gap-4" @submit.prevent="login">
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
        placeholder="Enter Email Here">
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
      <q-btn
        unelevated
        rounded
        color="green"
        label="Login"
        text-color="dark"
        class="px-8"
        type="submit" />
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
