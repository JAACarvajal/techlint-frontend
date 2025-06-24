<template>
  <div ref="selectRef" :class="['relative inline-block z-100', className]">
    <!-- Select button -->
    <button
      class="w-full h-[39px] bg-white border border-[#E9EFF5] text-[#222325] px-4 py-2.5 rounded flex justify-between items-center cursor-pointer"
      type="button"
      @click="toggle"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <ArrowDownIcon fill="#000" />
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
import ArrowDownIcon from '@/components/icons/arrow_down.svg'

const emit = defineEmits(['update:select'])
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  modelValue: {
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const selectRef = useClickOutside(close)
const open = ref(false)
const selectedSearch = computed(() => props.modelValue)
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
