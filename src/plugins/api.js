import axios from 'axios'

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
  async (error) => {
    const excludeAccessDeniedUrls = ['/api/auth/login']
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (
        error.response?.data.error.type === 'AccessDeniedHttpException' &&
        !excludeAccessDeniedUrls.includes(originalRequest.url)
      ) {
        originalRequest._retry = true

        try {
          const { data } = await api.post('/api/auth/refresh')
          localStorage.setItem('token', data.attributes.token)
          api.defaults.headers.Authorization = `Bearer ${data.attributes.token}`
          originalRequest.headers.Authorization = `Bearer ${data.attributes.token}`

          return api(originalRequest)
        } catch (err) {
          localStorage.removeItem('token')
          window.location.href = '/login'
          return Promise.reject(err)
        }
      }

      if (error.response?.data.error.type === 'TokenExpiredException') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api
