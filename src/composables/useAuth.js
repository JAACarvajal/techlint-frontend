import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, check, logout as logoutUser } from '@/services/authService'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const store = useAuthStore()
  const router = useRouter()

  const loading = ref(false)
  const error = ref(null)

  async function authenticate(credentials) {
    loading.value = true

    try {
      const {
        data: {
          attributes: { token },
        },
      } = await login(credentials)

      localStorage.setItem('token', token)
      store.setAuthenticated(true)

      const { data: user } = await check()
      store.setUser(user)

      loading.value = false

      router.push('/home')
    } catch (err) {
      error.value = err.message

      loading.value = false

      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await logoutUser()

      store.setAuthenticated(false)
      localStorage.removeItem('token')

      router.push('/login')
    } catch (err) {
      store.setAuthenticated(false)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    authenticate,
    error,
    loading,
    logout,
  }
}
