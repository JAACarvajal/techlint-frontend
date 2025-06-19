<template>
  <div class="w-11/12 m-12">
    <!-- <button type="button" @click.prevent="toggleModal('add')">Add</button> -->
    <!-- Filter -->
    <!-- <Filter
      :options="IP_MANAGEMENT_SEARCH_OPTIONS"
      @filter="(fitlers) => filter(fitlers)"
      :default-search="'address'"
    /> -->

    <!-- Table -->
    <Table
      :data="ipManagementStore.list.data"
      :headers="IP_MANAGEMENT_TABLE_HEADERS"
      :pagination-data="ipManagementStore.list.meta"
      :loading="loading"
      @page:change="(page) => updatePage(page)"
      @toggle:edit="(ipId) => toggleModal('update', ipId)"
      @delete="(ipId) => destroy(ipId)"
      @sort:toggle="(sorts) => sort(sorts)"
    >
      <template #column-group>
        <colgroup>
          <col class="max-w-[330px]" />
          <col class="max-w-[146px]" />
          <col class="max-w-[175px]" />
          <col class="max-w-[500px]" />
          <col class="max-w-[400px]" />
          <col class="max-w-[400px]" />
          <col class="max-w-[300px]" />
        </colgroup>
      </template>
    </Table>

    <!-- Modals for add and update -->
    <Modal :visible="isFormModalVisible" @close="toggleModal(formMode)">
      <Form :onSubmit="() => (formMode === 'add' ? addIpAddress() : updateIpAddress())">
        <template #form-body>
          <label for="address">Address:</label>
          <input type="text" placeholder="Address" v-model="currentForm.address" /><br />

          <label for="label">Label:</label>
          <input type="text" placeholder="Label" v-model="currentForm.label" /><br />

          <label for="comment">Comment:</label>
          <input type="text" placeholder="Comment" v-model="currentForm.comment" /><br />

          <button type="submit">{{ formMode === 'add' ? 'Add' : 'Update' }}</button>
        </template>
      </Form>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useIpAddress } from '@/composables/useIpAddress'
import { useSort } from '@/composables/useSort'
import { useFilter } from '@/composables/useFilter'
import { IP_MANAGEMENT_TABLE_HEADERS, IP_MANAGEMENT_SEARCH_OPTIONS } from '@/constants'
import { scrollToElement } from '@/utils'
import Form from '@/components/forms/Form.vue'
import Filter from '@/components/Filter.vue'
import Table from '@/components/tables/Table.vue'
import Modal from '@/components/modals/Modal.vue'

const { create, destroy, loading, list, update } = useIpAddress()
const ipManagementStore = useIpManagementStore()
const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const isFormModalVisible = computed(() => isAddModalVisible.value || isUpdateModalVisible.value)
const formMode = computed(() => (isAddModalVisible.value ? 'add' : 'update'))
const currentForm = computed(() =>
  formMode.value === 'add' ? addIpForm.value : updateIpForm.value,
)
const onUpdateId = ref(null)

const blankForm = () => {
  return { address: null, label: null, comment: null }
}

const getList = async (page) => {
  ipManagementStore.setQueryPage(page)
  await list()

  // document.getElementById('pagination').scrollIntoView({ behavior: 'smooth' })
}
const addIpForm = ref(blankForm())
const updateIpForm = ref(blankForm())
const sort = useSort(ipManagementStore, getList)
const filter = useFilter(ipManagementStore, getList)

const addIpAddress = () => {
  create(addIpForm.value)
  isAddModalVisible.value = false
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

const updateIpAddress = () => {
  update(onUpdateId.value, updateIpForm.value)
  isUpdateModalVisible.value = false
  onUpdateId.value = null
}

const updatePage = async (page) => {
  await getList(page)
  scrollToElement('#pagination')
}
onMounted(() => {
  getList()
})
</script>
