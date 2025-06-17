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
import { useSort } from '@/composables/useSort'
import { useAuditLogStore } from '@/stores/auditLog'
import { AUDIT_LOG_TABLE_HEADERS, AUDIT_LOG_SEARCH_OPTIONS } from '@/constants'
import Table from '@/components/tables/Table.vue'
import Pagination from '@/components/Pagination.vue'
import Filter from '@/components/Filter.vue'

const getList = (page) => {
  auditLogStore.setQueryPage(page)
  list()
}

const { list } = useAuditLog()
const auditLogStore = useAuditLogStore()
const sort = useSort(auditLogStore, auditLogStore.setQuerySort, getList)

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

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
