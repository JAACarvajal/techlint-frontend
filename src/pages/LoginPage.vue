<template>
  <div class="flex justify-center w-screen h-screen items-center">
    <Form>
      <template #form-body>
        <div
          class="flex flex-col w-[32rem] h-[32rem] justify-center rounded-4xl shadow-2xl p-14 text-md mb-4"
        >
          <!-- Title -->
          <div class="flex justify-center mb-8">
            <p class="font-bold text-3xl text-[#444250]">User Login</p>
          </div>

          <!-- Email input -->
          <Input
            :input-data="email"
            :input-attrs="emailAttrs"
            :error="errors.email"
            :label="'Email'"
            :placeholder="'Enter email address'"
            :name="'email'"
            @update:data="(input) => (email = input)"
          />

          <!-- Password input -->
          <Input
            :input-data="password"
            :input-attrs="passwordAttrs"
            :error="errors.password"
            :type="'password'"
            :label="'Password'"
            :placeholder="'Enter password'"
            :name="'password'"
            :toggleable="true"
            @update:data="(input) => (password = input)"
          />

          <!-- Login button -->
          <Button
            :text="'Login'"
            :type="'submit'"
            :loading="loading"
            :disabled="loading"
            @submit="() => login()"
          />
          <p class="text-xs mt-3 text-[#444250]">
            Don’t have an account yet? <a class="text-[#705ABF]" href="/register">Register here</a>
          </p>
        </div>
      </template>
    </Form>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Form from '@/components/forms/Form.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import Toast from '@/components/toasts/Toast.vue'

const { authenticate, loading } = useAuth()
const router = useRouter()

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})
const validationConfig = { validateOnModelUpdate: false }
const { errors, defineField, handleSubmit, values } = useForm({ validationSchema: schema })
const [email, emailAttrs] = defineField('email', validationConfig)
const [password, passwordAttrs] = defineField('password', validationConfig)

const checkToken = async () => {
  if (localStorage.getItem('token') !== null) {
    router.push('/home')
  }
}

const onValidationError = ({ errors }) => {
  const firstError = Object.keys(errors)[0]
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({
    behavior: 'smooth',
  })
  el.focus()
}

const onValidationSuccess = async () => {
  try {
    await authenticate(values)
  } catch (err) {
    alert(err.message)
  }
}

const login = handleSubmit(onValidationSuccess, onValidationError)

onMounted(() => {
  checkToken()
})
</script>
