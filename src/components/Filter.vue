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
const search = ref(null)
const selectedDate = ref('createdAt')
const startDate = ref(new Date().toISOString().slice(0, 10))
const endDate = ref(new Date().toISOString().slice(0, 10))
const selectedSearch = ref('address')
const emit = defineEmits(['filter'])

function resetFilter() {
  search.value = ''
  selectedSearch.value = 'address'

  emit('filter')
}

function handleFilterChange() {
  const filter = {}
  filter[selectedSearch.value] = search.value
  filter[selectedDate.value] = startDate.value + ',' + endDate.value

  emit('filter', filter)
}
</script>

<style lang="scss" scoped></style>
