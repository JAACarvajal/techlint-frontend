<template>
  <div>
    <form @submit.prevent="login">
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
import { useAuth } from '@/composables/useAuth'

const { authenticate } = useAuth()
const router = useRouter()
const email = ref('')
const password = ref('')

const checkToken = async () => {
  if (localStorage.getItem('token') !== null) {
    router.push('/home')
  }
}

const login = () => {
  try {
    authenticate({
      email: email.value,
      password: password.value,
    })
  } catch (err) {
    alert('Login failed: ' + (err?.message || err))
  }
}

onMounted(() => {
  checkToken()
})
</script>
