<template>
  <div>
    <!-- Filter -->
    <Filter
      :options="AUDIT_LOG_SEARCH_OPTIONS"
      @filter="(filters) => filter(filters)"
      :default-search="'targetId'"
    />

    <!-- Table -->
    <Table
      :data="auditLogStore.list.data"
      :headers="AUDIT_LOG_TABLE_HEADERS"
      :with-actions="false"
      @sort:toggle="(sorts) => sort(sorts)"
    />

    <!-- Pagination -->
    <Pagination :pagination-data="auditLogStore.list.meta" @page-change="(page) => getList(page)" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuditLog } from '@/composables/useAuditLog'
import { useSort } from '@/composables/useSort'
import { useFilter } from '@/composables/useFilter'
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
const sort = useSort(auditLogStore, getList)
const filter = useFilter(auditLogStore, getList)

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
