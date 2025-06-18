<template>
  <div class="flex justify-center w-screen h-screen items-center">
    <Form :onSubmit="() => login()">
      <template #form-body>
        <div class="flex flex-col w-[32rem] h-[32rem] rounded-4xl shadow-2xl p-14 text-md mb-4">
          <div class="flex justify-center mb-16">
            <p class="font-bold text-3xl text-[#444250]">User Login</p>
          </div>

          <Input
            :input-data="credentials.email"
            :label="'Email'"
            :placeholder="'Enter email address'"
            :name="'email'"
            @update:data="(input) => (credentials.email = input)"
          />

          <Input
            :input-data="credentials.password"
            :type="'password'"
            :label="'Password'"
            :placeholder="'Enter password'"
            :name="'password'"
            :toggleable="true"
            @update:data="(input) => (credentials.password = input)"
          />

          <Button :text="'Login'" />
          <p class="text-xs mt-3 text-[#444250]">
            Don’t have an account yet? <a class="text-[#705ABF]" href="/register">Register here</a>
          </p>
        </div>
      </template>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Form from '@/components/forms/Form.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'

const { authenticate } = useAuth()
const router = useRouter()

const credentials = ref({
  email: '',
  password: '',
})

const checkToken = async () => {
  if (localStorage.getItem('token') !== null) {
    router.push('/home')
  }
}

const login = () => {
  try {
    authenticate(credentials.value)
  } catch (err) {
    alert('Login failed: ' + (err?.message || err))
  }
}

onMounted(() => {
  checkToken()
})
</script>
