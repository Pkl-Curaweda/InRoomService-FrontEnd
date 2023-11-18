import axios from 'axios'
import router from './router'
import { Cookies } from 'quasar'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

const refreshToken = Cookies.get('refreshToken')

api.interceptors.request.use(
  (config) => {
    const refreshToken = Cookies.get('refreshToken')
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newToken = await api.post('/auth/refresh', {
          refreshToken: refreshToken,
        })

        originalRequest.headers.Authorization = `Bearer ${newToken.data.token}`

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError)

        router.push('/admin')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
