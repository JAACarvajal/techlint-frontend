import axios from 'axios'

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.GATEWAY_API_URL || 'http://localhost:54000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const exludeUrls = ['/api/auth/login', '/api/user']

    if (exludeUrls.includes(config.url) === false) {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Failed request')
    }
    return Promise.reject(error)
  },
)

export default api
