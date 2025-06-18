<template>
  <div class="fixed top-6 right-6 z-50 flex flex-col gap-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'bg-white flex items-center px-4 py-2 rounded shadow-lg min-w-[300px] min-h-[70px] transition-all duration-300 animate-slide-top-in',
        toastType(toast),
      ]"
    >
      <span v-if="toast.type === 'success'" class="mr-2">✔</span>
      <span v-else-if="toast.type === 'error'" class="mr-2"> &times; </span>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

const toastType = (toast) => {
  return toast.type === 'success'
    ? 'text-green-700 border border-green-300'
    : toast.type === 'error'
      ? 'text-red-700 border border-red-300'
      : 'text-gray-900 border border-gray-300'
}
</script>
