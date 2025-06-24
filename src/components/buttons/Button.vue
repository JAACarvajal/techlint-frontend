<template>
  <button
    ref="el"
    :class="[
      'cursor-pointer border rounded-md bg-[#705ABF] hover:bg-[#544191] disabled:bg-[#705ABF] disabled:cursor-not-allowed',
      className,
    ]"
    :disabled="loading"
    :type="props.type"
    @click.prevent="emit('submit')"
  >
    <div class="flex items-center justify-center">
      <template v-if="props.loading">
        <SpinningLoader />
      </template>
      <template v-else>
        <span class="flex gap-2">
          <slot name="icon"></slot>
          {{ text }}
        </span>
      </template>
    </div>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import SpinningLoader from '@/components/icons/spinning_icon.svg'

const emit = defineEmits(['submit'])
const props = defineProps({
  className: {
    type: String,
    default: 'text-[14px] font-medium px-2 py-2.5 text-white mt-4',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
})

const el = ref(null)
defineExpose({ el })
</script>

<style lang="scss" scoped></style>
