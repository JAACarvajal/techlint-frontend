<template>
  <div>
    <form>
      <br />
      <select v-model="selectedSearch">
        <option v-for="(option, idx) in props.options" :value="option.value" :key="idx">
          {{ option.label }}
        </option>
      </select>
      <input type="text" placeholder="Search" v-model="search" />
      <br />
      <select v-model="selectedDate">
        <option v-for="(option, idx) in DATE_SEARCH_OPTIONS" :value="option.value" :key="idx">
          {{ option.label }}
        </option>
      </select>
      <label>Start Date</label>
      <input type="date" v-model="startDate" />
      <label>End Date</label>
      <input type="date" v-model="endDate" />
      <button type="button" @click.prevent="handleFilterChange">Search</button>
      <br />
      <br />
      <button type="button" @click.prevent="resetFilter">Reset</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DATE_SEARCH_OPTIONS } from '@/constants'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['filter'])
const endDate = ref(null)
const search = ref(null)
const selectedDate = ref('createdAt')
const selectedSearch = ref('address')
const startDate = ref(null)

function resetFilter() {
  search.value = ''
  selectedSearch.value = 'address'
  selectedDate.value = 'createdAt'
  startDate.value = null
  endDate.value = null

  emit('filter')
}

function handleFilterChange() {
  const filter = {}

  filter[selectedSearch.value] = search.value

  if (startDate.value) {
    filter[selectedDate.value] = startDate.value
  }

  if (endDate.value) {
    filter[selectedDate.value] = (filter[selectedDate.value] || '') + ',' + endDate.value
  }

  emit('filter', filter)
}
</script>

<style lang="scss" scoped></style>
