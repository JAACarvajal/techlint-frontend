<template>
  <div id="ip-management" class="w-11/12 m-12">
    <!-- Header and Filter -->
    <div id="main-ip-header" class="w-full">
      <p class="text-2xl font-medium">IP Address Management</p>
    </div>

    <div class="w-full flex justify-between items-center py-4">
      <!-- Total results -->
      <div class="flex justify-between items-center gap-4 text-[#444250]">
        <p>
          Total results: <span class="font-medium">{{ ipManagementStore?.list?.meta?.total }}</span>
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
            class="absolute min-w-[500px] border border-[#E9EFF5] bg-white shadow-xl right-10 top-12 p-6 rounded-md z-100"
          >
            <Filter
              default-search="id"
              :options="IP_MANAGEMENT_SEARCH_OPTIONS"
              @filter="(fitlers) => applyFilter(fitlers)"
              @close="() => closeFilter()"
            />
          </div>
          <Button
            class-name="text-[14px] font-medium px-2.5 py-2 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
            @submit="toggleFormModal('add')"
          >
            <template #icon>
              <PlusIcon />
            </template>
          </Button>
        </div>
      </div>
    </div>
    <!-- End of Filter -->

    <!-- Table -->
    <Table
      :store="ipManagementStore"
      :headers="IP_MANAGEMENT_TABLE_HEADERS"
      :loading="tableLoading"
      @page:change="(page) => updatePage(page)"
      @toggle:edit="(ipId) => toggleFormModal('update', ipId)"
      @delete="(ipId) => toggleDeleteModal(ipId)"
      @sort:toggle="(sorts) => sort(sorts)"
    >
      <template #column-group>
        <colgroup>
          <col class="w-[40px]" />
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
    <!-- End of Table -->

    <!-- Add/Update modal -->
    <Teleport to="body">
      <Modal
        :visible="isFormModalVisible"
        :title="IP_MANAGEMENT_FORM_MAPPER[formMode].form_title"
        @close="toggleFormModal(formMode)"
      >
        <template #content>
          <Form :onSubmit="() => handleIPAddress()">
            <template #form-body>
              <div class="mb-8">
                <Input
                  class-name="text-[14px] mt-1.5 w-full font-medium"
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
                  class-name="text-[14px] mt-1.5 w-full font-medium"
                  :input-data="label"
                  :input-attrs="labelAttrs"
                  :error="validationErrors.label"
                  :max-length="30"
                  label="Label"
                  placeholder="Enter label"
                  name="label"
                  @update:data="(input) => (label = input)"
                />
              </div>

              <div class="mb-8">
                <Textarea
                  class-name="text-[14px] mt-1.5 w-full font-medium"
                  :input-data="comment"
                  :input-attrs="commentAttrs"
                  :error="validationErrors.comment"
                  :max-length="150"
                  label="Comment"
                  placeholder="Enter comment"
                  name="comment"
                  @update:data="(input) => (comment = input)"
                />
              </div>

              <div class="flex justify-between gap-2">
                <Button
                  text="Cancel"
                  class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
                  @submit="toggleFormModal(formMode)"
                />

                <Button
                  :text="IP_MANAGEMENT_FORM_MAPPER[formMode].button_text"
                  :loading="loading"
                  :disabled="loading"
                  class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 border-none shadow-md text-white"
                  @submit="() => handleIPAddress()"
                />
              </div>
            </template>
          </Form>
        </template>
      </Modal>
    </Teleport>
    <!-- End of Add/update Modal -->

    <!-- Delete modal -->
    <Teleport to="body">
      <Modal
        :visible="isDeleteModalVisible"
        :title="`Delete ${onDeleteIp?.address}`"
        @close="() => toggleDeleteModal()"
      >
        <template #content>
          <div class="flex flex-col gap-y-10">
            <div>
              <p>
                Are you sure that you want to delete this IP address? <br />
                If you want to proceed, click
                <span class="font-bold">Confirm Delete</span>
              </p>
            </div>
            <div class="flex justify-between gap-2">
              <Button
                text="Cancel"
                class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 text-black bg-white border-none shadow-md hover:bg-[#D3C8F6] duration-300"
                @submit="toggleDeleteModal"
              />

              <Button
                :text="IP_MANAGEMENT_FORM_MAPPER['delete'].button_text"
                :loading="loading"
                :disabled="loading"
                class-name="w-[48%] text-[14px] font-medium px-2 py-2.5 text-white border-none shadow-md bg-[#D03749] hover:bg-[#922633] disabled:bg-[#922633]"
                @submit="() => deleteIp()"
              />
            </div>
          </div>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import * as yup from 'yup'
import { ref, onMounted } from 'vue'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useIpAddress } from '@/composables/useIpAddress'
import { useSort } from '@/composables/useSort'
import { useFilter } from '@/composables/useFilter'
import { useToastStore } from '@/stores/toast'
import { useForm } from 'vee-validate'
import { scrollToElement, isset } from '@/utils'
import { useClickOutside } from '@/composables/useClickOutside'
import {
  IP_MANAGEMENT_TABLE_HEADERS,
  IP_MANAGEMENT_SEARCH_OPTIONS,
  ITEMS_PER_PAGE,
  IP_MANAGEMENT_FORM_MAPPER,
} from '@/constants'
import Form from '@/components/forms/Form.vue'
import Table from '@/components/tables/Table.vue'
import Modal from '@/components/modals/Modal.vue'
import Filter from '@/components/Filter.vue'
import Button from './buttons/Button.vue'
import FilterIcon from '@/components/icons/filters.svg'
import PlusIcon from '@/components/icons/plus.svg'
import Select from '@/components/dropdowns/Select.vue'
import Input from '@/components/inputs/Input.vue'
import Textarea from '@/components/inputs/Textarea.vue'

const { create, destroy, loading, list, update, errors } = useIpAddress()
const toast = useToastStore()
const ipManagementStore = useIpManagementStore()
const onUpdateId = ref(null)
const onUpdateData = ref(null)
const onDeleteIp = ref(null)
const onDeleteId = ref(null)
const showFilter = ref(false)
const filterApplied = ref(false)
const selectedPageItems = ref(10)
const tableLoading = ref(false)
const isFormModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const filterRef = useClickOutside(closeFilter)
const formMode = ref('add')
const sort = useSort(ipManagementStore, getList)
const filter = useFilter(ipManagementStore, getList)

const schema = yup.object({
  address: yup.string().required().label('Address'),
  label: yup.string().required().min(1).max(30).label('Label'),
  comment: yup.string().max(150).nullable().label('Comment'),
})
const {
  errors: validationErrors,
  defineField,
  handleSubmit,
  resetForm,
  setFieldError,
  values,
} = useForm({ validationSchema: schema })
const validationConfig = { validateOnModelUpdate: false }
const [address, addressAttrs] = defineField('address', validationConfig)
const [label, labelAttrs] = defineField('label', validationConfig)
const [comment, commentAttrs] = defineField('comment', validationConfig)
const handleIPAddress = handleSubmit(onValidationSuccess, onValidationError)

function onValidationError({ errors }) {
  const firstError = Object.keys(errors)[0]
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({
    behavior: 'smooth',
  })
  el.focus()
}

async function onValidationSuccess() {
  if (formMode.value === 'add') {
    await create(values)
  } else {
    await update(onUpdateId.value, formatChanges())
  }

  if (errors.value) {
    toast.showToast(errors.value[0].message, 'error')

    for (const error of errors.value) {
      setFieldError(error.field, error.message)
    }

    return
  }

  resetForm()
  toggleFormModal(formMode.value)
  toast.showToast(IP_MANAGEMENT_FORM_MAPPER[formMode.value].success_message, 'success')
  getList()
}

function formatChanges() {
  const changes = {}
  for (const key of Object.keys(values)) {
    if (onUpdateData.value[key] !== values[key]) {
      changes[key] = values[key]
    }
  }
  return changes
}

async function deleteIp() {
  await destroy(onDeleteId.value)

  if (errors.value) {
    toast.showToast(errors.value[0].message, 'error')

    return
  }

  ipManagementStore.$reset()
  toggleDeleteModal()
  await getList()
  toast.showToast('Successfully deleted an IP address', 'success')
}

async function getList(page = 1) {
  tableLoading.value = true

  ipManagementStore.setQueryPage(page)

  await list()

  tableLoading.value = false
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

async function updatePageRows(numberOfRows) {
  selectedPageItems.value = numberOfRows
  ipManagementStore.setQueryRows(numberOfRows)
  await getList()
  scrollToElement('#main-ip-header')
}

function toggleFormModal(action = 'add', id = null) {
  resetForm()
  formMode.value = action
  isFormModalVisible.value = !isFormModalVisible.value

  if (action === 'add') {
    resetForm()
    return
  }

  onUpdateData.value = ipManagementStore.list.data.find((ip) => ip.id === id)?.attributes
  ;(address.value = onUpdateData.value?.address),
    (label.value = onUpdateData.value?.label),
    (comment.value = onUpdateData.value?.comment),
    (onUpdateId.value = id)
}

function toggleDeleteModal(id = null) {
  isDeleteModalVisible.value = !isDeleteModalVisible.value
  onDeleteId.value = id

  if (isset(id)) {
    onDeleteIp.value = ipManagementStore.list.data.find((ip) => ip.id === id)?.attributes
  }
}

async function updatePage(page) {
  await getList(page)
  scrollToElement('#main-ip-header')
}

onMounted(() => {
  getList()
})
</script>
