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
import { useAuth } from '@/composables/useAuth'

const { authenticate } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

async function checkToken() {
  if (localStorage.getItem('token') !== null) {
    router.push('/home')
  }
}

async function submit() {
  try {
    await authenticate({
      email: email.value,
      password: password.value,
    })
  } catch (err) {
    alert('Login failed: ' + (err?.message || err))
  }
}

function init() {
  checkToken()
}

onMounted(() => {
  init()
})
</script>
