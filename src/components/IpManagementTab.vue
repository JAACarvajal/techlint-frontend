<template>
  <div id="ip-management" class="w-11/12 m-12">
    <!-- <button type="button" @click.prevent="toggleModal('add')">Add</button> -->
    <!-- Filter -->
    <div class="w-full flex justify-between items-center py-6">
      <div class="flex justify-between items-center gap-4">
        <p class="text-2xl font-medium">IP Management</p>
      </div>
      <div class="flex justify-between relative gap-3">
        <div class="flex justify-between gap-4 items-center text-[#444250]">
          <span>Items per page</span>
          <Select
            v-model="selectedPageItems"
            :options="ITEMS_PER_PAGE"
            :class-name="'w-[90px]'"
            @update:select="(val) => updatePageRows(val)"
          />
        </div>

        <div class="flex justify-between align-center gap-3 relative">
          <Button
            :text="'Show Filters'"
            :class-name="'text-[14px] font-medium px-5 py-2 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300'"
            @submit="toggleFilter"
          >
            <template #icon>
              <FilterIcon />
            </template>
          </Button>
          <div
            v-show="showFilter"
            class="absolute min-w-[400px] border border-[#E9EFF5] bg-white shadow-xl right-0 top-12 p-6 rounded-md z-100"
          >
            <Filter
              :options="IP_MANAGEMENT_SEARCH_OPTIONS"
              @filter="(fitlers) => applyFilter(fitlers)"
              @close="() => closeFilter()"
            />
          </div>
          <Button
            :text="'Add'"
            :class-name="'text-[14px] font-medium px-5 py-2 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300'"
            @submit="toggleModal('add')"
          >
            <template #icon>
              <PlusIcon />
            </template>
          </Button>
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

    <!-- <Modal :visible="isFormModalVisible" @close="toggleModal(formMode)">
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
    </Modal> -->

    <Teleport to="body">
      <Modal :visible="isFormModalVisible" title="Add IP Address" @close="toggleModal(formMode)">
        <template #content>
          <Form :onSubmit="() => (formMode === 'add' ? addIpAddress() : updateIpAddress())">
            <template #form-body>
              <div class="mb-8">
                <Input
                  :class-name="'text-[14px] mt-1.5 w-full font-medium'"
                  :input-data="address"
                  :input-attrs="addressAttrs"
                  :error="validationErrors.address"
                  label="IP Address"
                  placeholder="Enter IP address"
                  name="address"
                  @update:data="(input) => (address = input)"
                />
              </div>

              <div class="mb-8">
                <Input
                  :class-name="'text-[14px] mt-1.5 w-full font-medium'"
                  :input-data="label"
                  :input-attrs="labelAttrs"
                  :error="validationErrors.label"
                  label="Label"
                  placeholder="Enter label"
                  name="label"
                  @update:data="(input) => (label = input)"
                />
              </div>

              <div class="mb-8">
                <Input
                  :class-name="'text-[14px] mt-1.5 w-full font-medium'"
                  :input-data="comment"
                  :input-attrs="commentAttrs"
                  :error="validationErrors.comment"
                  label="Comment"
                  placeholder="Enter comment"
                  name="comment"
                  @update:data="(input) => (comment = input)"
                />
              </div>
              <!-- <label for="address">Address:</label>
              <input type="text" placeholder="Address" v-model="currentForm.address" /><br />

              <label for="label">Label:</label>
              <input type="text" placeholder="Label" v-model="currentForm.label" /><br />

              <label for="comment">Comment:</label>
              <input type="text" placeholder="Comment" v-model="currentForm.comment" /><br /> -->

              <div class="flex justify-between gap-2">
                <Button
                  text="Cancel"
                  class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
                  @submit="toggleModal(formMode)"
                />

                <Button
                  text="Add"
                  class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 text-white"
                  @submit="() => addIPAddress()"
                />
              </div>

              <!-- <button type="submit">{{ formMode === 'add' ? 'Add' : 'Update' }}</button> -->
            </template>
          </Form>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { computed, ref, onMounted } from 'vue'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useIpAddress } from '@/composables/useIpAddress'
import { useSort } from '@/composables/useSort'
import { useFilter } from '@/composables/useFilter'
import { useToastStore } from '@/stores/toast'
import { useForm } from 'vee-validate'
import {
  IP_MANAGEMENT_TABLE_HEADERS,
  IP_MANAGEMENT_SEARCH_OPTIONS,
  ITEMS_PER_PAGE,
} from '@/constants'
import { scrollToElement } from '@/utils'
import Form from '@/components/forms/Form.vue'
import Table from '@/components/tables/Table.vue'
import Modal from '@/components/modals/Modal.vue'
import Filter from '@/components/Filter.vue'
import Button from './buttons/Button.vue'
import FilterIcon from '@/components/icons/filters.svg'
import PlusIcon from '@/components/icons/plus.svg'
import Select from './dropdowns/Select.vue'
import Input from './inputs/Input.vue'

const { create, destroy, loading, list, update } = useIpAddress()
const toast = useToastStore()
const ipManagementStore = useIpManagementStore()
const isAddModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const onUpdateId = ref(null)
const showFilter = ref(false)
const selectedPageItems = ref(10)
const isFormModalVisible = computed(() => isAddModalVisible.value || isUpdateModalVisible.value)
const formMode = computed(() => (isAddModalVisible.value ? 'add' : 'update'))
const currentForm = computed(() =>
  formMode.value === 'add' ? addIpForm.value : updateIpForm.value,
)

const schema = yup.object({
  address: yup.string().required().label('Address'),
  label: yup.string().required().label('Label'),
  comment: yup.string().required().label('Comment'),
})
const {
  errors: validationErrors,
  defineField,
  handleSubmit,
  values,
} = useForm({ validationSchema: schema })
const validationConfig = { validateOnModelUpdate: false }
const [address, addressAttrs] = defineField('address', validationConfig)
const [label, labelAttrs] = defineField('label', validationConfig)
const [comment, commentAttrs] = defineField('comment', validationConfig)

function onValidationError({ errors }) {
  const firstError = Object.keys(errors)[0]
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({
    behavior: 'smooth',
  })
  el.focus()
}

function onValidationSuccess() {
  create(values)

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')
    return
  }

  toast.showToast('Logged in successfully', 'success')
}

const addIPAddress = handleSubmit(onValidationSuccess, onValidationError)

function blankForm() {
  return { address: null, label: null, comment: null }
}

function getList(page = 1) {
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

function closeFilter() {
  showFilter.value = false
}

function resetAddForm() {
  addIpForm.value = blankForm()
}

async function updatePageRows(numberOfRows) {
  ipManagementStore.setQueryRows(numberOfRows)

  getList()

  scrollToElement('#main')
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
  getList(page)
  scrollToElement('#main')
}

onMounted(() => {
  getList()
})
</script>
