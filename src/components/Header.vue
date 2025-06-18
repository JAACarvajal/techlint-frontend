<template>
  <div :class="props.class">
    <Logo />
    <button class="text-white cursor-pointer" @click.prevent="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import Logo from '@/components/icons/logo.svg'
import { useAuth } from '@/composables/useAuth'
import { useToastStore } from '@/stores/toast'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})

const { errors, logout } = useAuth()
const toast = useToastStore()

const logoutUser = async () => {
  await logout()

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')
    return
  }

  toast.showToast('Logged out successfully', 'success')
}
</script>

<style lang="scss" scoped></style>
