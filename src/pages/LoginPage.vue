<template>
  <div class="w-screen h-screen flex justify-center items-center bg-white">
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
          <div class="mb-8">
            <Input
              :class-name="'text-[14px] mt-1.5 w-full font-medium'"
              :input-data="email"
              :input-attrs="emailAttrs"
              :error="validationErrors.email"
              :label="'Email'"
              :placeholder="'Enter email address'"
              :name="'email'"
              @update:data="(input) => (email = input)"
            />
          </div>

          <!-- Password input -->
          <div class="mb-8">
            <Input
              :class-name="'text-[14px] mt-1.5 w-full font-medium'"
              :input-data="password"
              :input-attrs="passwordAttrs"
              :error="validationErrors.password"
              :type="'password'"
              :label="'Password'"
              :placeholder="'Enter password'"
              :name="'password'"
              :toggleable="true"
              @update:data="(input) => (password = input)"
            />
          </div>

          <!-- Login button -->
          <Button
            :text="'Login'"
            :type="'submit'"
            :loading="loading"
            :disabled="loading"
            :class-name="'text-[14px] font-medium px-2 py-2.5 text-white mt-4'"
            @submit="() => login()"
          />
          <p class="text-xs mt-3 text-[#444250]">
            Don't have an account yet? <a class="text-[#705ABF]" href="/register">Register here</a>
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
import { useToastStore } from '@/stores/toast'

const { authenticate, loading, errors } = useAuth()
const router = useRouter()

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().label('Password'),
})
const toast = useToastStore()
const validationConfig = { validateOnModelUpdate: false }
const {
  errors: validationErrors,
  defineField,
  handleSubmit,
  values,
} = useForm({ validationSchema: schema })
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
  await authenticate(values)

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')
    return
  }

  toast.showToast('Logged in successfully', 'success')
}

const login = handleSubmit(onValidationSuccess, onValidationError)

onMounted(() => {
  checkToken()
})
</script>
