<template>
  <div class="relative">
    <label class="font-medium text-[#444250] text-[14px]" :for="props.name">{{
      props.label
    }}</label>
    <input
      :name="props.name"
      ref="inputElement"
      class="text-[14px] mt-1.5 mb-8 px-2 py-2.5 border border-[#E9EFF5] rounded-md w-full"
      :type="inputType"
      :placeholder="props.placeholder"
      :value="props.inputData"
      @input="emit('update:data', $event.target.value)"
    />
    <div
      class="absolute inset-y-0 right-3 top-0 bottom-1 flex items-center cursor-pointer"
      @click.prevent="toggleInputVisibility"
    >
      <div v-if="props.toggleable">
        <EyeIcon v-if="!showInput" />
        <EyeIconSelected v-if="showInput" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EyeIcon from '@/components/icons/icon_eye.svg'
import EyeIconSelected from '@/components/icons/icon_eye_selected.svg'

const props = defineProps({
  label: {
    type: String,
    default: 'Input',
  },
  inputData: {
    type: String,
    default: '',
    required: true,
  },
  name: {
    type: String,
    default: 'Input',
  },
  placeholder: {
    type: String,
    default: 'Enter value',
  },
  toggleable: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
})
const emit = defineEmits(['update:data', 'update:visible'])
const inputElement = ref(null)
const showInput = ref(false)

const inputType = computed(() => {
  if (props.toggleable === false) return props.type
  if (props.type === 'password') return showInput.value === true ? 'text' : 'password'
  return props.type
})

const toggleInputVisibility = () => {
  if (props.toggleable === false) return
  showInput.value = !showInput.value
  emit('update:visible', showInput.value)
}
</script>

<style lang="scss" scoped></style>
