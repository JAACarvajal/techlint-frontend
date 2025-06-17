<template>
  <div>
    <!-- Add Form -->
    <IpForm
      :form="addIpForm"
      @update:form="(val) => (addIpForm = val)"
      :onSubmit="() => create(addIpForm)"
    />

    <!-- Update/Edit Form -->
    <IpForm
      :form="updateIpForm"
      @update:form="(val) => (updateIpForm = val)"
      :onSubmit="() => update(onEditId, updateIpForm)"
      :is-show="onEdit"
    />

    <!-- Filter -->
    <Filter :options="IP_MANAGEMENT_SEARCH_OPTIONS" @filter="(val) => applyFilter(val)" />

    <!-- Table -->
    <table>
      <tr>
        <th v-for="header in IP_MANAGEMENT_TABLE_HEADERS" :key="header.key">{{ header.label }}</th>
        <th>Actions</th>
      </tr>
      <tr v-for="ip in ipManagementStore.list.data" :key="ip.id">
        <td v-for="header in IP_MANAGEMENT_TABLE_HEADERS" :key="header.key">
          {{ ip.attributes[header.key] }}
        </td>
        <td>
          <div>
            <button
              type="button"
              @click.prevent="toggleOnEdit(ip.id)"
              v-if="
                authStore.user?.attributes?.is_admin || authStore.user?.id === ip.attributes.user_id
              "
            >
              Edit
            </button>
            <button
              v-if="authStore.user?.attributes?.is_admin"
              type="button"
              @click.prevent="destroy(ip.id)"
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    </table>

    <!-- Pagination -->
    <Pagination :pagination-data="ipManagementStore.list.meta" @page-change="getList" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useIpAddress } from '@/composables/useIpAddress'
import IpForm from './forms/IpForm.vue'
import Pagination from './Pagination.vue'
import Filter from './Filter.vue'
import { IP_MANAGEMENT_TABLE_HEADERS, IP_MANAGEMENT_SEARCH_OPTIONS } from '@/constants'

const { create, destroy, list, update } = useIpAddress()
const authStore = useAuthStore()
const ipManagementStore = useIpManagementStore()
const onEdit = ref(false)
const onEditId = ref(null)
const addIpForm = ref(blankForm())
const updateIpForm = ref(blankForm())

function applyFilter(val) {
  if (val === null || val === undefined) {
    ipManagementStore.$reset()

    getList()

    return
  }

  for (const key in val) {
    ipManagementStore.setQueryFilter(key, val[key])
  }

  console.log(ipManagementStore.query)

  getList()
}

function blankForm() {
  return { address: null, label: null, comment: null }
}

function resetAddForm() {
  addIpForm.value = blankForm()
}

function resetUpdateForm() {
  updateIpForm.value = blankForm()
}

function toggleOnEdit(id) {
  onEdit.value = !onEdit.value
  onEditId.value = id
}

async function getList() {
  await list()
  resetAddForm()
  resetUpdateForm()
}

onMounted(async () => {
  await getList()
})
</script>

<style lang="scss" scoped></style>
