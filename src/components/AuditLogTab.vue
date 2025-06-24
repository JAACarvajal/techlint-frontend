<template>
  <div id="audit-logs" class="w-11/12 m-12">
    <!-- Header and Filter -->
    <div id="main-audit-header" class="w-full">
      <p class="text-2xl font-medium">Audit Logs</p>
    </div>

    <div class="w-full flex justify-between items-center py-4">
      <!-- Total results -->
      <div class="flex justify-between items-center gap-4 text-[#444250]">
        <p>
          Total results: <span class="font-medium">{{ auditLogStore?.list?.meta?.total }}</span>
        </p>
      </div>

      <!-- Filters -->
      <div class="flex justify-between relative gap-3">
        <div class="flex justify-between gap-4 items-center text-[#444250]">
          <span>Items per page</span>
          <Select
            v-model="selectedPageItems"
            :options="ITEMS_PER_PAGE"
            class-name="w-[90px]"
            @update:select="(val) => updatePageRows(val)"
          />
        </div>

        <div class="flex justify-between items-center gap-3 relative">
          <div class="flex relative">
            <!-- Filter applied animation -->
            <span v-show="filterApplied" class="absolute left-8 bottom-7">
              <span class="relative flex size-3">
                <span
                  class="absolute right-0 inline-flex h-full w-full animate-ping rounded-full bg-[#705ABF] opacity-75"
                ></span>
                <span class="relative inline-flex size-3 rounded-full bg-[#705ABF]"></span>
              </span>
            </span>

            <Button
              class-name="text-[14px] font-medium px-2.5 py-2 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
              @submit="toggleFilter"
            >
              <template #icon>
                <FilterIcon />
              </template>
            </Button>
          </div>
          <div
            ref="filterRef"
            v-show="showFilter"
            class="absolute min-w-[500px] border border-[#E9EFF5] bg-white shadow-xl right-12 top-12 p-6 rounded-md z-100"
          >
            <Filter
              :options="AUDIT_LOG_SEARCH_OPTIONS"
              :exclude-date-options="['updatedAt']"
              default-search="targetId"
              @filter="(fitlers) => applyFilter(fitlers)"
              @close="() => closeFilter()"
            />
          </div>

          <Button
            class-name="text-[14px] font-medium px-2.5 py-2 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
            @submit="() => getList()"
          >
            <template #icon>
              <RefreshIcon />
            </template>
          </Button>
        </div>
      </div>
    </div>
    <!-- End of Filter -->

    <!-- Table -->
    <Table
      :store="auditLogStore"
      :headers="AUDIT_LOG_TABLE_HEADERS"
      :loading="tableLoading"
      :with-actions="false"
      @page:change="(page) => updatePage(page)"
      @sort:toggle="(sorts) => sort(sorts)"
    >
      <template #column-group>
        <colgroup>
          <col class="w-[50px]" />
          <col class="w-[100px]" />
          <col class="w-[100px]" />
          <col class="w-[50px]" />
          <col class="w-[300px]" />
          <col class="w-[100px]" />
        </colgroup>
      </template>
    </Table>
    <!-- End of Table -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuditLog } from '@/composables/useAuditLog'
import { useSort } from '@/composables/useSort'
import { useFilter } from '@/composables/useFilter'
import { useAuditLogStore } from '@/stores/auditLog'
import { AUDIT_LOG_TABLE_HEADERS, AUDIT_LOG_SEARCH_OPTIONS, ITEMS_PER_PAGE } from '@/constants'
import { scrollToElement, isset } from '@/utils'
import { useClickOutside } from '@/composables/useClickOutside'
import Table from '@/components/tables/Table.vue'
import Filter from '@/components/Filter.vue'
import FilterIcon from '@/components/icons/filters.svg'
import RefreshIcon from '@/components/icons/refresh.svg'
import Button from './buttons/Button.vue'
import Select from '@/components/dropdowns/Select.vue'

const { list } = useAuditLog()
const auditLogStore = useAuditLogStore()
const sort = useSort(auditLogStore, getList)
const selectedPageItems = ref(10)
const tableLoading = ref(false)
const filterApplied = ref(false)
const showFilter = ref(false)
const filter = useFilter(auditLogStore, getList)
const filterRef = useClickOutside(closeFilter)

async function getList(page = 1) {
  tableLoading.value = true

  auditLogStore.setQueryPage(page)
  await list()

  tableLoading.value = false
}

async function updatePageRows(numberOfRows) {
  selectedPageItems.value = numberOfRows
  auditLogStore.setQueryRows(numberOfRows)
  await getList()
  scrollToElement('#main-audit-header')
}

async function updatePage(page) {
  await getList(page)
  scrollToElement('#main-audit-header')
}

function applyFilter(filters) {
  filterApplied.value = isset(filters)
  showFilter.value = !showFilter.value
  filter(filters, selectedPageItems.value)
}

function toggleFilter() {
  showFilter.value = !showFilter.value
}

function closeFilter() {
  showFilter.value = false
}

onMounted(() => {
  auditLogStore.$reset()
  getList()
})
</script>

<style lang="scss" scoped></style>
