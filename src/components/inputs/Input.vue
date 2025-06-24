<template>
  <div :class="['relative', containerClass]">
    <!-- Label -->
    <label class="font-medium text-[#444250] text-[15px] mb-1" :for="props.name">
      {{ props.label }}
    </label>

    <div>
      <!-- Input -->
      <input
        v-bind="props.inputAttrs"
        ref="inputElement"
        :class="[
          'px-4 py-3 border border-[#E9EFF5] bg-[#FAFAFA] rounded-[5px] text-[#444250] focus:outline-none focus:border-[#705ABF]',
          className,
        ]"
        :maxlength="maxLength"
        :name="props.name"
        :placeholder="props.placeholder"
        :type="inputType"
        :value="props.inputData"
        @input="emit('update:data', $event.target.value)"
        @keyup.enter.prevent="emit('submit:enter')"
      />
      <div
        class="absolute inset-y-0 right-3 top-3.5 flex items-center cursor-pointer"
        @click.prevent="toggleInputVisibility"
      >
        <div v-if="props.toggleable">
          <EyeIcon v-if="!showInput" />
          <EyeIconSelected v-if="showInput" />
        </div>
      </div>

      <!-- Error message -->
      <div v-if="props.error" class="text-[14px] text-red-400 font-medium mt-0.5">
        <p>{{ props.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import EyeIcon from '@/components/icons/icon_eye.svg'
import EyeIconSelected from '@/components/icons/icon_eye_selected.svg'

const emit = defineEmits(['update:data', 'update:visible', 'submit:enter'])
const props = defineProps({
  className: { type: String, default: '' },
  containerClass: { type: String, default: '' },
  error: { type: String, default: '' },
  inputAttrs: { type: Object, default: () => ({}) },
  inputData: { type: String, default: '', required: true },
  label: { type: String, default: '' },
  maxLength: { type: Number, default: 100 },
  name: { type: String, default: 'Input' },
  placeholder: { type: String, default: 'Enter value' },
  toggleable: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
})

const inputElement = ref(null)
const showInput = ref(false)
const inputType = computed(() => {
  if (props.toggleable === false) return props.type
  if (props.type === 'password') return showInput.value === true ? 'text' : 'password'
  return props.type
})

function toggleInputVisibility() {
  if (props.toggleable === false) return
  showInput.value = !showInput.value
  emit('update:visible', showInput.value)
}
</script>
