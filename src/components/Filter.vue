<template>
  <div>
    <form class="flex flex-col justify-between">
      <!-- Search -->
      <div class="flex justify-between mb-4">
        <Input
          :name="'search'"
          :class-name="'w-[320px] h-[39px] mr-2'"
          :placeholder="'Search here...'"
          :input-data="search"
          @update:data="(val) => (search = val)"
          @submit:enter="handleFilterChange"
        />
        <Select
          v-model="selectedSearch"
          :options="props.options"
          :class-name="'w-[180px]'"
          @update:select="(val) => (selectedSearch = val)"
        />
      </div>

      <!-- Date search -->
      <div class="flex justify-end mb-1 gap-2">
        <VueDatePicker
          placeholder="Select a date range"
          format="yyyy-MM-dd HH:mm:ss"
          v-model="date"
          range
          enable-seconds
        ></VueDatePicker>
        <Select
          v-model="selectedDate"
          :options="DATE_SEARCH_OPTIONS"
          :class-name="'w-[285px]'"
          @update:select="(val) => (selectedDate = val)"
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

const emit = defineEmits(['filter'])
const endDate = ref('')
const startDate = ref('')
const date = ref([startDate, endDate])
const search = ref('')
const selectedDate = ref('')
const selectedSearch = ref(props.defaultSearch)

const resetFilter = () => {
  search.value = ''
  selectedSearch.value = props.defaultSearch
  selectedDate.value = 'createdAt'
  startDate.value = null
  endDate.value = null

  emit('filter')
}

const handleFilterChange = () => {
  const filter = {}

  if (selectedSearch.value) {
    filter[selectedSearch.value] = search.value
  }

  if (date.value && selectedDate.value) {
    filter[selectedDate.value] =
      dayjs(date.value[0]).format('YYYY-MM-DD HH:mm:ss') +
      ',' +
      dayjs(date.value[1]).format('YYYY-MM-DD HH:mm:ss')
  }

  emit('filter', filter)
}
</script>

<style lang="scss" scoped></style>
