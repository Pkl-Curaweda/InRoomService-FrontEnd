<template>
  <div class="flex items-center flex-col justify-center">
    <img src="../../assets/img/logoLingian.png" alt="" />
    <div v-if="$route.path !== '/admin'">
      <div v-if="!display" class="w-full flex justify-center items-center">
        <q-select
          rounded
          outlined
          v-model="model"
          :options="options"
          label="Login As"
          color="dark"
          class="outline-none focus:bg-none active:bg-none w-full"
          bg-color="white" />

        <q-btn
          unelevated
          rounded
          color="green"
          label="Next"
          text-color="dark"
          class="px-8 mt-4"
          @click="handleNext" />
      </div>
    </div>

    <q-form
      class="flex items-center flex-col mt-3 gap-4"
      @submit.prevent="login"
      v-if="display || $route.path === '/admin'">
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
        class="md:w-80 w-60 drop-shadow-sm outline-none focus:bg-none active:bg-none">
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
        @click="login"
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
  import api from 'src/AxiosInterceptors'
  import { Cookies, useQuasar } from 'quasar'

  export default {
    setup() {
      const $q = useQuasar()

      return {
        showNotif() {
          $q.notify({
            message: 'Login successful!',
            textColor: 'green',
            color: 'white',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'green',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
        errorNotif() {
          $q.notify({
            message: 'Login Failed!',
            color: 'red',
            position: 'top',
            actions: [
              {
                icon: 'close',
                color: 'white',
                round: true,
                handler: () => {
                  /* ... */
                },
              },
            ],
          })
        },
      }
    },
    data() {
      return {
        email: '',
        pw: '',
        ph: '',
        dense: false,
        model: null,
        options: ['User', 'Mitra'],
        display: false,
      }
    },
    computed: {
      $route() {
        return useRoute()
      },
    },
    methods: {
      // async login() {
      //   if (this.$route.path === '/admin') {
      //     try {
      //       const response = await axios.post(
      //         'http://localhost:8080/auth/login',
      //         {
      //           email: this.email,
      //           password: this.pw,
      //         },
      //         {
      //           withCredentials: true,
      //         }
      //       )

      //       const token = response.data.data.accessToken
      //       console.log(token)

      //       localStorage.setItem('token', token)

      //       this.$router.push('/mitra/upload')
      //     } catch (error) {
      //       console.error('Login failed!', error.message)
      //     }
      //   }
      // },

      async login() {
        if (this.$route.path === '/admin') {
          try {
            const response = await api.post(
              '/auth/login',
              { email: this.email, password: this.pw },
              { withCredentials: true }
            )

            const token = response.data.data.accessToken
            console.log(token)
            console.log('berhasil login')
            console.log(response.data.message)
            const refreshToken = Cookies.get('refreshToken')

            console.log(refreshToken)
            // localStorage.setItem('auth', true)
            localStorage.setItem('token', token)

            this.showNotif()

            this.$nextTick(() => {
              this.$router.push('/admin/home')
            })
            // this.$router.push({
            //   path: '/admin/home',
            //   query: { successMessage: 'Login successful' },
            // })
          } catch (error) {
            this.errorNotif()
            console.error('Login failed', error)
          }
        } else if (this.$route.path === '/login') {
          try {
            const response = await api.post(
              '/auth/login',
              { email: this.email, password: this.pw },
              { withCredentials: true }
            )

            const token = response.data.data.accessToken
            console.log(token)
            console.log('berhasil login')
            const refreshToken = Cookies.get('refreshToken')

            console.log(refreshToken)
            // localStorage.setItem('auth', true)
            localStorage.setItem('token', token)

            this.showNotif()

            this.$nextTick(() => {
              this.$router.push('/home')
            })
          } catch (error) {
            this.errorNotif()
            console.error('Login failed', error)
          }
        } else if (this.$route.path === '/mitra') {
          try {
            const response = await api.post(
              '/auth/login',
              { email: this.email, password: this.pw },
              { withCredentials: true }
            )

            const token = response.data.data.accessToken
            console.log(token)
            console.log('berhasil login')
            const refreshToken = Cookies.get('refreshToken')

            console.log(refreshToken)
            // localStorage.setItem('auth', true)
            localStorage.setItem('token', token)

            this.showNotif()

            this.$nextTick(() => {
              this.$router.push('/mitra/home')
            })
          } catch (error) {
            this.errorNotif()
            console.error('Login failed', error)
          }
        }
      },

      handleNext() {
        if (this.model === 'User') {
          this.display = true
          console.log('tes')
        } else if (this.model === 'Mitra') {
          this.display = true
          this.$router.push('/mitra')
        }
      },
    },
  }
</script>
