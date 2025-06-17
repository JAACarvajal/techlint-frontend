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
import { useSort } from '@/composables/useSort'
import { IP_MANAGEMENT_TABLE_HEADERS, IP_MANAGEMENT_SEARCH_OPTIONS } from '@/constants'
import IpForm from '@/components/forms/IpForm.vue'
import Pagination from '@/components/Pagination.vue'
import Filter from '@/components/Filter.vue'
import Table from '@/components/tables/Table.vue'
import Modal from '@/components/modals/Modal.vue'

const { create, destroy, list, update } = useIpAddress()
const ipManagementStore = useIpManagementStore()
const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const onUpdateId = ref(null)

const blankForm = () => {
  return { address: null, label: null, comment: null }
}

const getList = (page) => {
  ipManagementStore.setQueryPage(page)
  list()
}
const addIpForm = ref(blankForm())
const updateIpForm = ref(blankForm())
const sort = useSort(ipManagementStore, ipManagementStore.setQuerySort, getList)

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

const resetAddForm = () => {
  addIpForm.value = blankForm()
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
