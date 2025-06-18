<template>
  <button
    class="cursor-pointer font-medium border rounded-md text-[14px] px-2 py-2.5 bg-[#705ABF] text-white mt-4 hover:bg-[#544191] disabled:bg-[#705ABF] disabled:cursor-not-allowed"
    :type="props.type"
    :disabled="loading"
    @click.prevent="emit('submit')"
  >
    <div class="flex items-center justify-center">
      <template v-if="props.loading">
        <SpinningLoader />
      </template>
      <template v-else>
        <span>{{ props.text }}</span>
      </template>
    </div>
  </button>
</template>

<script setup>
import SpinningLoader from '@/components/loaders/spinning_icon.svg'

const props = defineProps({
  text: {
    type: String,
    default: 'Submit',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['submit'])
</script>

<style lang="scss" scoped></style>
