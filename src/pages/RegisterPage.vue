<template>
  <div class="flex justify-center w-screen h-screen items-center">
    <Form>
      <template #form-body>
        <div
          class="flex flex-col w-[32rem] h-auto justify-center rounded-4xl shadow-2xl p-14 text-md mb-4"
        >
          <!-- Title -->
          <div class="flex justify-center mb-8">
            <p class="font-bold text-3xl text-[#444250]">Registration</p>
          </div>

          <!-- First name -->
          <Input
            :input-data="first_name"
            :input-attrs="firstNameAttrs"
            :error="valildationErrors.first_name"
            :label="'First name'"
            :placeholder="'Enter first name'"
            :name="'first_name'"
            @update:data="(input) => (first_name = input)"
          />

          <!-- Last name -->
          <Input
            :input-data="last_name"
            :input-attrs="lastNameAttrs"
            :error="valildationErrors.last_name"
            :label="'Last name'"
            :placeholder="'Enter last name'"
            :name="'last_name'"
            @update:data="(input) => (last_name = input)"
          />

          <!-- Email input -->
          <Input
            :input-data="email"
            :input-attrs="emailAttrs"
            :error="valildationErrors.email"
            :label="'Email'"
            :placeholder="'Enter email address'"
            :name="'email'"
            @update:data="(input) => (email = input)"
          />

          <!-- Password input -->
          <Input
            :input-data="password"
            :input-attrs="passwordAttrs"
            :error="valildationErrors.password"
            :type="'password'"
            :label="'Password'"
            :placeholder="'Enter password'"
            :name="'password'"
            :toggleable="true"
            @update:data="(input) => (password = input)"
          />

          <!-- Login button -->
          <Button
            :text="'Register'"
            :type="'submit'"
            :loading="loading"
            :disabled="loading"
            @submit="() => submit()"
          />
          <p class="text-xs mt-3 text-[#444250]">
            Already have an account? <a class="text-[#705ABF]" href="/login">Login here</a>
          </p>
        </div>
      </template>
    </Form>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import Form from '@/components/forms/Form.vue'
import Input from '@/components/inputs/Input.vue'
import Button from '@/components/buttons/Button.vue'
import { useToastStore } from '@/stores/toast'
import { useUser } from '@/composables/useUser'

const { register, loading, errors } = useUser()
const schema = yup.object({
  first_name: yup.string().required().label('First name'),
  last_name: yup.string().required().label('Last name'),
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().min(10).label('Password'),
})
const toast = useToastStore()
const validationConfig = { validateOnModelUpdate: false }
const {
  errors: valildationErrors,
  defineField,
  handleSubmit,
  values,
  setFieldError,
} = useForm({ validationSchema: schema })
const [first_name, firstNameAttrs] = defineField('first_name', validationConfig)
const [last_name, lastNameAttrs] = defineField('last_name', validationConfig)
const [email, emailAttrs] = defineField('email', validationConfig)
const [password, passwordAttrs] = defineField('password', validationConfig)

const onValidationError = ({ errors }) => {
  const firstError = Object.keys(errors)[0]
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({
    behavior: 'smooth',
  })
  el.focus()
}

const onValidationSuccess = async () => {
  await register(values)

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')

    for (const error of errors.value.errors) {
      setFieldError(error.field, error.message)
    }

    return
  }

  toast.showToast('Successfully created an account', 'success')
}

const submit = handleSubmit(onValidationSuccess, onValidationError)
</script>
