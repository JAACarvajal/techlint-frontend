<template>
  <div>
    <form @submit.prevent="submit">
      <h1>Login Page</h1>
      <label for="email">Email:</label>
      <input type="text" placeholder="email" v-model="email" /><br />
      <label for="password">Password:</label>
      <input type="password" placeholder="Password" v-model="password" /><br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import { useAuthStore } from '@/stores'

const store = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

async function checkToken() {
  if (localStorage.getItem('token') !== null) {
    router.push('/home')
  }
}

async function submit() {
  try {
    console.log('Submitting login with', email.value, password.value)

    const response = await login(email.value, password.value)

    localStorage.setItem('token', response.data.attributes.token)

    store.setAuthenticated(true)

    router.push('/home')
  } catch (err) {
    store.setAuthenticated(false)
    alert('Login failed: ' + err)
  }
}

onMounted(() => {
  checkToken()
})
</script>
