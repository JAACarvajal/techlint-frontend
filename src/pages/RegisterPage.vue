<template>
  <div>
    <form @submit.prevent="submit">
      <h1>Register Page</h1>
      <label for="first_name">First name:</label>
      <input type="text" placeholder="First name" v-model="data.first_name" /><br />

      <label for="last_name">Last name:</label>
      <input type="text" placeholder="Last name" v-model="data.last_name" /><br />

      <label for="email">Email:</label>
      <input type="text" placeholder="Email" v-model="data.email" /><br />

      <label for="password">Password:</label>
      <input type="password" placeholder="Password" v-model="data.password" /><br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/userService'

const router = useRouter()
const data = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})

const submit = () => {
  try {
    register(data.value)

    alert('Registration successful!')

    router.push('/login')
  } catch (err) {
    alert('Registration failed: ' + err)
  }
}
</script>
