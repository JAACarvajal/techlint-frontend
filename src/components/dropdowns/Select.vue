<template>
  <div ref="selectRef" :class="['relative inline-block z-100', className]">
    <!-- Select button -->
    <button
      @click="toggle"
      class="w-full h-[39px] bg-white border border-[#E9EFF5] text-[#A0A9B3] px-4 py-2.5 rounded flex justify-between items-center cursor-pointer"
      type="button"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <svg
        class="w-4 h-4 text-[#A0A9B3] ml-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <ul
      v-show="open"
      class="absolute z-100 w-full mt-1 bg-white border border-[#E9EFF5] rounded shadow-lg max-h-60 overflow-y-auto transition-all"
      @keydown.esc="close"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        :class="[
          'cursor-pointer select-none px-4 py-2 hover:bg-[#D3C8F6] duration-100',
          selectedSearch === option.value ? 'font-medium' : '',
          option?.disabled ? 'pointer-events-none text-[#A0A9B3]' : '',
        ]"
        @click.prevent="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    required: false,
  },
})

const emit = defineEmits(['update:select'])
const open = ref(false)
const selectRef = useClickOutside(close)
const selectedSearch = ref(props.modelValue ?? '')

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === selectedSearch.value)
  return found ? found.label : 'Filter by'
})

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function select(value) {
  selectedSearch.value = value

  emit('update:select', value)
  close()
}
</script>
