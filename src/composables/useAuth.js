import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, check, logout as logoutUser } from '@/services/authService'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const loading = ref(false)
  const errors = ref(null)

  async function authenticate(credentials) {
    loading.value = true

    try {
      const loginResponse = await login(credentials)
      if (loginResponse.error) throw loginResponse.error

      localStorage.setItem('token', loginResponse.data.attributes.token)
      store.setAuthenticated(true)

      const checkResponse = await check()
      if (checkResponse.error) throw checkResponse.error

      store.setUser(checkResponse.data)
      router.push('/home')
    } catch (err) {
      errors.value = err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true

    try {
      const response = await logoutUser()
      if (response.error) throw response.error

      store.setAuthenticated(false)
      localStorage.removeItem('token')

      router.push('/login')
    } catch (err) {
      errors.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    authenticate,
    errors,
    loading,
    logout,
  }
}
