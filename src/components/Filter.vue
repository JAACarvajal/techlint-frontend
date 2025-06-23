<template>
  <div>
    <form class="flex flex-col justify-between">
      <div class="flex justify-between mb-3 font-medium t text-xl">
        <span>Filters</span>
        <span class="cursor-pointer" @click.prevent="() => emit('close')">⛌</span>
      </div>

      <!-- Search -->
      <p class="text-xs mb-1 text-[#43474b]">Filter by columns</p>
      <div class="flex items-center mb-4 z-999 gap-x-2">
        <Select
          v-model="selectedSearch"
          :options="props.options"
          class-name="w-[170px]"
          @update:select="(val) => (selectedSearch = val)"
        />
        <Input
          name="search"
          class-name="w-[270px] h-[39px]"
          placeholder="Search here..."
          :input-data="search"
          @update:data="(val) => (search = val)"
          @submit:enter="handleFilterChange"
        />
      </div>

      <!-- Date search -->
      <p class="text-xs mb-1 text-[#43474b]">Filter by date</p>
      <div class="flex justify-end mb-1 gap-x-2">
        <Select
          v-model="selectedDate"
          :options="DATE_SEARCH_OPTIONS"
          class-name="w-[285px]"
          @update:select="(val) => (selectedDate = val)"
        />
        <VueDatePicker
          placeholder="Select a date range"
          format="yyyy-MM-dd HH:mm:ss"
          v-model="date"
          range
          enable-seconds
        />
      </div>

      <div class="flex justify-between">
        <Button
          class-name="w-[49%] text-[14px] font-medium px-2 py-2.5 mt-4 bg-white text-black border-[#E9EFF5] duration-300 hover:bg-[#D3C8F6]"
          :text="'Reset'"
          @submit="resetFilter"
        />
        <Button
          class-name="w-[49%] text-[14px] font-medium px-2 py-2.5 text-white mt-4"
          :text="'Search'"
          @submit="handleFilterChange"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DATE_SEARCH_OPTIONS } from '@/constants'
import Input from './inputs/Input.vue'
import Button from './buttons/Button.vue'
import Select from './dropdowns/Select.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    required: true,
  },
})

const emit = defineEmits(['filter', 'close'])
const date = ref(['', ''])
const search = ref('')
const selectedDate = ref('createdAt')
const selectedSearch = ref('address')

const resetFilter = () => {
  search.value = ''
  selectedSearch.value = ''
  selectedDate.value = ''
  date.value = ['', '']

  emit('filter')
}

const handleFilterChange = () => {
  const filter = {}

  if (selectedSearch.value && search.value) {
    filter[selectedSearch.value] = search.value
  }

  if (selectedDate.value && date.value[0] && date.value[1]) {
    filter[selectedDate.value] =
      dayjs(date.value[0]).format('YYYY-MM-DD HH:mm:ss') +
      ',' +
      dayjs(date.value[1]).format('YYYY-MM-DD HH:mm:ss')
  }

  emit('filter', filter)
}
</script>

<style lang="scss" scoped></style>
