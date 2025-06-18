<template>
  <div
    v-if="show"
    class="fixed top-6 right-6 z-50 bg-white shadow-lg rounded-lg px-6 py-4 flex items-center gap-2 border border-gray-300 transition-opacity duration-300"
  >
    <span class="text-green-600 font-semibold">✔</span>
    <span>{{ message }}</span>
    <button class="ml-4 text-gray-400 hover:text-gray-600" @click="show = false">&times;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  duration: { type: Number, default: 3000 },
  type: { type: String, default: 'success' },
})

const show = ref(true)
</script>
