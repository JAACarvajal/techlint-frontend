<template>
  <Transition name="modal">
    <!-- Background -->
    <div
      v-if="visible"
      class="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000080] flex items-center justify-center z-999"
    >
      <!-- Main content -->
      <div class="min-w-[500px] max-h-[600px] bg-white p-12 rounded-xl">
        <div class="flex justify-between mb-6">
          <h1 class="text-xl font-bold">{{ title }}</h1>
          <span class="cursor-pointer" @click="() => emit('close')">⛌</span>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  title: String,
  visible: Boolean,
})

const emit = defineEmits(['close'])
</script>
