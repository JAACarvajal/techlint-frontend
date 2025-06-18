import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/services/userService'

export function useUser() {
  const router = useRouter()

  const loading = ref(false)
  const errors = ref(null)

  async function register(data) {
    loading.value = true

    try {
      const response = await registerUser(data)

      if (response.error) throw response.error

      router.push('/login')
    } catch (err) {
      errors.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    register,
    errors,
    loading,
  }
}
