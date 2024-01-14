import axios from 'axios';
import { useRouter } from 'vue-router';
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const route = useRouter();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await api.get('/auth/refresh', {
          withCredentials: true,
        });
        console.log('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken.data.data.accessToken}`;
        localStorage.setItem('token', newToken.data.data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        localStorage.removeItem('token');
        // window.location.replace('/login')
        route.push('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
