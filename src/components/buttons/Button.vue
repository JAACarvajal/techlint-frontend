<template>
  <button
    class="cursor-pointer font-medium border rounded-md text-[14px] px-2 py-2.5 bg-[#705ABF] text-white mt-6"
    :type="props.type"
    :disabled="props.disabled"
    @click.prevent="emit('submit')"
  >
    {{ props.text || 'Submit' }}
  </button>
</template>

<script setup>
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
})
const emit = defineEmits(['submit'])
</script>

<style lang="scss" scoped></style>
