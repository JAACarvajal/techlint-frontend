<template>
  <div>
    <button type="button" @click.prevent="toggleModal('add')">Add</button>
    <!-- Filter -->
    <Filter
      :options="IP_MANAGEMENT_SEARCH_OPTIONS"
      @filter="(val) => applyFilter(val)"
      :default-search="'address'"
    />

    <!-- Table -->
    <Table
      :data="ipManagementStore.list.data"
      :headers="IP_MANAGEMENT_TABLE_HEADERS"
      @toggle:edit="(id) => toggleModal('update', id)"
      @delete="(id) => destroy(id)"
      @sort:toggle="(key) => sort(key)"
    />

    <!-- Pagination -->
    <Pagination
      :pagination-data="ipManagementStore.list.meta"
      @page-change="(page) => getList(page)"
    />

    <Modal :visible="isAddModalVisible" @close="toggleModal('add', null)">
      <!-- Add Form -->
      <IpForm
        :form="addIpForm"
        @update:form="(data) => (addIpForm = data)"
        :onSubmit="() => addIpAddress(addIpForm)"
      />
    </Modal>

    <Modal :visible="isUpdateModalVisible" @close="toggleModal('update', null)">
      <IpForm
        :form="updateIpForm"
        @update:form="(updatedData) => (updateIpForm = updatedData)"
        :onSubmit="() => updateIpAddress(onUpdateId, updateIpForm)"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useIpAddress } from '@/composables/useIpAddress'
import IpForm from './forms/IpForm.vue'
import Pagination from './Pagination.vue'
import Filter from './Filter.vue'
import Table from './tables/Table.vue'
import Modal from './modals/Modal.vue'
import { IP_MANAGEMENT_TABLE_HEADERS, IP_MANAGEMENT_SEARCH_OPTIONS } from '@/constants'
import { toCamelCase } from '@/utils'

const { create, destroy, list, update } = useIpAddress()
const ipManagementStore = useIpManagementStore()
const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const onUpdateId = ref(null)
const addIpForm = ref(blankForm())
const updateIpForm = ref(blankForm())

const addIpAddress = (data) => {
  create(data)

  isAddModalVisible.value = false
}

const applyFilter = (val) => {
  if (val === null || val === undefined) {
    ipManagementStore.$reset()

    getList()

    return
  }

  for (const key in val) {
    ipManagementStore.setQueryFilter(key, val[key])
  }

  getList()
}

const blankForm = () => {
  return { address: null, label: null, comment: null }
}

const getList = (page) => {
  ipManagementStore.setQueryPage(page)
  list()
}

const resetAddForm = () => {
  addIpForm.value = blankForm()
}

const sort = (key) => {
  const formattedKey = toCamelCase(key)
  const currentSort = ipManagementStore.query.sort.split(',')

  const isDescending = currentSort.includes('-' + formattedKey)

  // Remove both possible forms from the current sort
  const updatedSort = currentSort.filter(
    (item) => item !== formattedKey && item !== '-' + formattedKey,
  )

  // Toggle sort direction
  const newSortKey = isDescending ? formattedKey : '-' + formattedKey
  updatedSort.unshift(newSortKey)

  ipManagementStore.setQuerySort(updatedSort.join(','))

  getList()
}

const toggleModal = (action, id = null) => {
  if (action === 'add') {
    resetAddForm()
    isAddModalVisible.value = !isAddModalVisible.value
    return
  }
  const data = ipManagementStore.list.data.find((ip) => ip.id === id)?.attributes

  updateIpForm.value = {
    address: data?.address || null,
    label: data?.label || null,
    comment: data?.comment || null,
  }

  isUpdateModalVisible.value = !isUpdateModalVisible.value
  onUpdateId.value = id
}

const updateIpAddress = (id, data) => {
  update(id, data)

  isUpdateModalVisible.value = false
  onUpdateId.value = null
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
