<template>
  <div class="w-11/12 m-12">
    <!-- <button type="button" @click.prevent="toggleModal('add')">Add</button> -->
    <!-- Filter -->
    <div class="w-full flex justify-between">
      <p class="text-2xl font-medium py-6">IP Management</p>
      <div class="relative">
        <Button
          :text="'Show Filters'"
          :class-name="'text-[14px] font-medium px-6 py-2.5 text-black my-4 bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300'"
          @submit="toggleFilter"
        >
          <template #icon>
            <FilterIcon />
          </template>
        </Button>
        <div
          v-show="showFilter"
          class="absolute min-w-[400px] border border-[#E9EFF5] bg-white shadow-xl right-0 top-16 p-4 rounded-md"
        >
          <Filter
            :options="IP_MANAGEMENT_SEARCH_OPTIONS"
            @filter="(fitlers) => applyFilter(fitlers)"
          />
        </div>
      </div>
    </div>

    <!-- <Filter :options="IP_MANAGEMENT_SEARCH_OPTIONS" @filter="(fitlers) => filter(fitlers)" /> -->

    <!-- Table -->
    <Table
      :store="ipManagementStore"
      :headers="IP_MANAGEMENT_TABLE_HEADERS"
      :loading="loading"
      @page:change="(page) => updatePage(page)"
      @toggle:edit="(ipId) => toggleModal('update', ipId)"
      @delete="(ipId) => destroy(ipId)"
      @sort:toggle="(sorts) => sort(sorts)"
    >
      <template #column-group>
        <colgroup>
          <col class="w-[100px]" />
          <col class="w-[100px]" />
          <col class="w-[175px]" />
          <col class="w-[400px]" />
          <col class="w-[200px]" />
          <col class="w-[200px]" />
          <col class="w-[100px]" />
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
import Table from '@/components/tables/Table.vue'
import Modal from '@/components/modals/Modal.vue'
import Filter from '@/components/Filter.vue'
import Button from './buttons/Button.vue'
import FilterIcon from '@/components/icons/filters.svg'

const { create, destroy, loading, list, update } = useIpAddress()
const ipManagementStore = useIpManagementStore()
const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const onUpdateId = ref(null)
const showFilter = ref(false)
const isFormModalVisible = computed(() => isAddModalVisible.value || isUpdateModalVisible.value)
const formMode = computed(() => (isAddModalVisible.value ? 'add' : 'update'))
const currentForm = computed(() =>
  formMode.value === 'add' ? addIpForm.value : updateIpForm.value,
)

function blankForm() {
  return { address: null, label: null, comment: null }
}

function getList(page) {
  ipManagementStore.setQueryPage(page)
  list()
}

const addIpForm = ref(blankForm())
const updateIpForm = ref(blankForm())
const sort = useSort(ipManagementStore, getList)
const filter = useFilter(ipManagementStore, getList)

function applyFilter(filters) {
  showFilter.value = !showFilter.value
  filter(filters)
}

function toggleFilter() {
  showFilter.value = !showFilter.value
}

function addIpAddress() {
  create(addIpForm.value)
  isAddModalVisible.value = false
}

function resetAddForm() {
  addIpForm.value = blankForm()
}

function toggleModal(action, id = null) {
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

async function updateIpAddress() {
  await update(onUpdateId.value, updateIpForm.value)
  isUpdateModalVisible.value = false
  onUpdateId.value = null
}

async function updatePage(page) {
  await getList(page)
  scrollToElement('#pagination')
}

onMounted(() => {
  getList()
})
</script>
