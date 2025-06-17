<template>
  <div>
    <!-- Filter -->
    <Filter
      :options="AUDIT_LOG_SEARCH_OPTIONS"
      @filter="(val) => applyFilter(val)"
      :default-search="'targetId'"
    />

    <!-- Table -->
    <Table
      :data="auditLogStore.list.data"
      :headers="AUDIT_LOG_TABLE_HEADERS"
      :with-actions="false"
      @sort:toggle="(key) => sort(key)"
    />

    <!-- Pagination -->
    <Pagination :pagination-data="auditLogStore.list.meta" @page-change="(page) => getList(page)" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuditLog } from '@/composables/useAuditLog'
import { useAuditLogStore } from '@/stores/auditLog'
import { AUDIT_LOG_TABLE_HEADERS, AUDIT_LOG_SEARCH_OPTIONS } from '@/constants'
import Table from './tables/Table.vue'
import Pagination from './Pagination.vue'
import Filter from './Filter.vue'
import { toCamelCase } from '@/utils'

const { list } = useAuditLog()
const auditLogStore = useAuditLogStore()

const getList = (page) => {
  auditLogStore.setQueryPage(page)
  list()
}

const applyFilter = (val) => {
  if (val === null || val === undefined) {
    auditLogStore.$reset()

    getList()

    return
  }

  for (const key in val) {
    auditLogStore.setQueryFilter(key, val[key])
  }

  getList()
}

const sort = (key) => {
  const formattedKey = toCamelCase(key)
  const currentSort = auditLogStore.query.sort.split(',')

  const isDescending = currentSort.includes('-' + formattedKey)

  // Remove both possible forms from the current sort
  const updatedSort = currentSort.filter(
    (item) => item !== formattedKey && item !== '-' + formattedKey,
  )

  // Toggle sort direction
  const newSortKey = isDescending ? formattedKey : '-' + formattedKey
  updatedSort.unshift(newSortKey)

  auditLogStore.setQuerySort(updatedSort.join(','))

  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
