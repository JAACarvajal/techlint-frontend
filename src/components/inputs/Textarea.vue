<template>
  <div class="relative">
    <!-- Label -->
    <label class="font-medium text-[#444250] text-[15px]" :for="props.name">{{
      props.label
    }}</label>

    <!-- Text area -->
    <textarea
      v-bind="props.inputAttrs"
      :name="props.name"
      ref="inputElement"
      :class="[
        'px-4 py-2.5 border border-[#E9EFF5] bg-[#FAFAFA] rounded-md text-[#444250] focus:outline-none focus:border-[#705ABF]',
        className,
      ]"
      :type="inputType"
      :placeholder="props.placeholder"
      :value="props.inputData"
      :maxlength="maxLength"
      @input="emit('update:data', $event.target.value)"
      @keyup.enter.prevent="emit('submit:enter')"
    />
    <div
      class="absolute inset-y-0 right-3 top-7.5 flex items-center cursor-pointer"
      @click.prevent="toggleInputVisibility"
    >
      <div v-if="props.toggleable">
        <EyeIcon v-if="!showInput" />
        <EyeIconSelected v-if="showInput" />
      </div>
    </div>
  </div>

  <!-- Error message -->
  <div class="text-[14px] text-red-400 font-medium mt-1" v-show="props.error">
    <p>{{ props.error }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EyeIcon from '@/components/icons/icon_eye.svg'
import EyeIconSelected from '@/components/icons/icon_eye_selected.svg'

const props = defineProps({
  className: { type: String, default: '' },
  error: { type: String, default: '' },
  label: { type: String, default: '' },
  inputAttrs: { type: Object, default: () => ({}) },
  inputData: { type: String, default: '', required: true },
  maxLength: { type: Number, default: 100 },
  name: { type: String, default: 'Input' },
  placeholder: { type: String, default: 'Enter value' },
  toggleable: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
})
const emit = defineEmits(['update:data', 'update:visible', 'submit:enter'])
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
