<template>
  <div
    class="rounded-2xl flex-1 flex flex-col justify-start max-h-[1000px] overflow-y-auto shadow-md w-full bg-white"
  >
    <!-- Table -->
    <table class="min-w-full">
      <!-- Column group -->
      <slot name="column-group"></slot>

      <!-- Headers -->
      <thead>
        <tr class="sticky top-0 z-10">
          <th
            v-for="header in headers"
            :key="header.key"
            class="text-[14px] px-4 py-6 text-white bg-[#444250] font-medium cursor-pointer"
            @click.prevent="() => emit('sort:toggle', header.key)"
          >
            <span>{{ sortIcon(header.key) }}&nbsp;&nbsp;{{ header.label }}</span>
          </th>
          <th v-if="withActions" class="text-[14px] px-4 py-6 text-white bg-[#444250] font-medium">
            Actions
          </th>
        </tr>
      </thead>

      <!-- Loading Rows -->
      <tbody v-if="loading">
        <tr>
          <td :colspan="colspan" class="text-center">
            <div class="flex justify-center py-[310px]">
              <SpinningLoaderIcon />
            </div>
          </td>
        </tr>
      </tbody>

      <!-- Data Rows -->
      <tbody v-if="store.list.data.length === 0 && !loading">
        <tr>
          <td :colspan="colspan" class="text-center">
            <div class="flex justify-center py-[310px]">No items to show</div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="store.list.data.length > 0 && !loading">
        <tr
          v-for="data in store.list.data"
          :key="data.id"
          class="text-[#444250] border-1 border-[#e9eff5]"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-2 text-center h-16 text-ellipsis text-wrap break-words max-w-xs',
              LEFT_ALIGNED_COLUMNS.includes(header.key) ? 'text-left' : '',
            ]"
          >
            <!-- ID column -->
            <div v-if="header.key === 'id'">
              <span>{{ data.id }}</span>
            </div>

            <!-- changes column -->
            <div class="px-2" v-else-if="header.key === 'changes'">
              <p>
                <span v-html="formattedChangesMap[data.id].description"></span>

                <ul v-if="'change_list' in formattedChangesMap[data.id]" class="list-disc list-inside">
                  <li v-for="(actionItem) in formattedChangesMap[data.id].change_list" v-html="actionItem"></li>
                </ul>
              </p>
            </div>
            <span v-else>{{ data.attributes[header.key] }}</span>
          </td>
          <td v-if="withActions" class="px-6 py-2 text-center">
            <div class="flex flex-row justify-center">
              <ActionButton v-if="canEdit(data)" icon="edit" :onClick="() => emit('toggle:edit', data.id)" />
              <ActionButton v-if="canDelete" icon="delete" :onClick="() => emit('delete', data.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <Pagination :pagination-data="store.list.meta" @page:change="(page) => emit('page:change', page)" />
</template>

<script setup lang="jsx">
import { computed, defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toCamelCase } from '@/utils'
import { IP_ADDRESS_AUDIT_LOG_MAPPER, USER_AUDIT_LOG_MAPPER, LEFT_ALIGNED_COLUMNS } from '@/constants'
import Pagination from '@/components/Pagination.vue'
import EditIcon from '@/components/icons/edit.svg'
import EditHoverIcon from '@/components/icons/edit_hover.svg'
import DeleteIcon from '@/components/icons/delete.svg'
import DeleteHoverIcon from '@/components/icons/delete_hover.svg'
import SpinningLoaderIcon from '@/components/icons/spinning_icon_black.svg'

const emit = defineEmits(['toggle:edit', 'delete', 'sort:toggle', 'page:change'])
const props = defineProps({
  headers: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  store: { type: Object, default: () => ({}) },
  withActions: { type: Boolean, default: true },
})

const authStore = useAuthStore()
const canDelete = computed(() => authStore.user?.attributes?.is_admin)
const colspan = computed(() => props.headers.length + (props.withActions ? 1 : 0))
const formattedChangesMap = computed(() => {
  const map = {}
  for (const data of props.store.list.data) {
    map[data.id] = formatChanges(data.attributes)
  }
  return map
})

function sortIcon(header) {
  const sortInfo = getSortInfo(header)

  if (sortInfo.direction === null) return

  if (sortInfo.isSorted && sortInfo.direction === 'desc') {
    return '⮟'
  }

  return '⮝'
}

function getSortInfo(headerKey) {
  const camelKey = toCamelCase(headerKey)
  const sortArray = props.store.query.sort.split(',')
  let sortIdx = -1
  let direction = null

  sortArray.forEach((sortKey, idx) => {
    const desc = sortKey.startsWith('-')
    const key = desc ? sortKey.slice(1) : sortKey

    if (key === camelKey) {
      sortIdx = idx
      direction = desc ? 'desc' : 'asc'
    }
  })

  return {
    isSorted: sortIdx !== -1,
    direction,
    index: sortIdx !== -1 ? sortIdx + 1 : null, // for display
  }
}
function formatChanges(attributes) {
  const targetType = attributes.target_type
  const action = attributes.action
  const changes = attributes.changes

  if (targetType === 'user') {
    return USER_AUDIT_LOG_MAPPER[action]
  }

  if (targetType === 'ip_address') {
    const auditLogObj = { ...IP_ADDRESS_AUDIT_LOG_MAPPER[action] } // shallow copy if needed

    if (action === 'update' || action === 'create') {
      const changeList = []
      for (const attribute of Object.keys(changes)) {
        changeList.push(`${attribute} ⭢ <strong>${changes[attribute]}</strong>`)
      }
      auditLogObj['change_list'] = changeList
    }

    return auditLogObj
  }

  return {}
}

function canEdit(ip) {
  return authStore.user?.attributes?.is_admin || authStore.user?.id === ip.attributes.user_id
}

const ActionButton = defineComponent({
  props: { icon: String, onClick: Function },
  setup(props) {
    return () => (
      <button type="button" class="group cursor-pointer m-1" onClick={props.onClick}>
        <span class="block group-hover:hidden">
          {props.icon === 'edit' ? <EditIcon /> : <DeleteIcon />}
        </span>
        <span class="hidden group-hover:block">
          {props.icon === 'edit' ? <EditHoverIcon /> : <DeleteHoverIcon />}
        </span>
      </button>
    )
  },
})
</script>
