import { createApp } from 'vue'
import App from './App.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import 'src/styles/main.css'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import './assets/tailwind.css'
import axios from 'axios'

const app = createApp(App)
const modules = import.meta.glob<any>('/src/modules/*.ts', { eager: true })
// const axiosApiInstance = axios.create()
// install all modules under `modules/`
Object.values(modules).forEach((module) => module.install?.(app))

// axios.defaults.baseURL = 'http://localhost:8080'

// axios.interceptors.request.use(
//   (config) => {
//     console.log(config)
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// axios.interceptors.response.use(
//   (response) => {
//     console.log(response)
//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

app.mount('#app')
