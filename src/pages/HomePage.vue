<template>
  <div>
    <nav>
      <button type="submit" @click.prevent="submit">Logout</button>
    </nav>

    <h1>Home Page</h1>
  </div>
</template>

<script setup>
import { check, logout } from '@/services/authService'
import { useAuthStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

async function submit() {
  try {
    await logout()

    localStorage.removeItem('token')

    store.setAuthenticated(false)
    store.setUser(null)

    router.push('/login')
  } catch (err) {
    alert('Logout failed: ' + err)
  }
}

async function checkToken() {
  if (localStorage.getItem('token') === null) {
    router.push('/login')
  }
}

onMounted(() => {
  checkToken()
})
</script>
