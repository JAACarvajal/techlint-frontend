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
            @click.prevent="onSort(header.key)"
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
              <SpinningLoader />
            </div>
          </td>
        </tr>
      </tbody>

      <!-- Data Rows -->
      <tbody v-else>
        <tr
          v-for="ip in store.list.data"
          :key="ip.id"
          class="text-[#444250] border-1 border-[#e9eff5]"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-2 text-center h-16',
              leftAlignedColumns.includes(header.key) ? 'text-left' : '',
            ]"
          >
            {{ ip.attributes[header.key] }}
          </td>
          <td v-if="withActions" class="px-6 py-2 text-center">
            <div class="flex flex-row justify-center">
              <ActionButton v-if="canEdit(ip)" icon="edit" :onClick="() => onEdit(ip.id)" />
              <ActionButton v-if="canDelete" icon="delete" :onClick="() => onDelete(ip.id)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <Pagination :pagination-data="store.list.meta" @page:change="onPageChange" />
</template>

<script setup lang="jsx">
import { computed, defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toCamelCase } from '@/utils'
import Pagination from '@/components/Pagination.vue'
import Edit from '@/components/icons/edit.svg'
import EditHover from '@/components/icons/edit_hover.svg'
import Delete from '@/components/icons/delete.svg'
import DeleteHover from '@/components/icons/delete_hover.svg'
import SpinningLoader from '@/components/loaders/spinning_icon_black.svg'

const props = defineProps({
  headers: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  store: { type: Object, default: () => ({}) },
  withActions: { type: Boolean, default: true },
})

const leftAlignedColumns = ['comment', 'label']
const emit = defineEmits(['toggle:edit', 'delete', 'sort:toggle', 'page:change'])
const authStore = useAuthStore()
const canDelete = computed(() => authStore.user?.attributes?.is_admin)
const colspan = computed(() => props.headers.length + (props.withActions ? 1 : 0))

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

function canEdit(ip) {
  return authStore.user?.attributes?.is_admin || authStore.user?.id === ip.attributes.user_id
}

function onSort(key) {
  emit('sort:toggle', key)
}
function onEdit(id) {
  emit('toggle:edit', id)
}
function onDelete(id) {
  emit('delete', id)
}
function onPageChange(page) {
  emit('page:change', page)
}

// TODO: use hover for color, remove icon
const ActionButton = defineComponent({
  props: { icon: String, onClick: Function },
  setup(props) {
    return () => (
      <button type="button" class="group cursor-pointer m-1" onClick={props.onClick}>
        <span class="block group-hover:hidden">
          {props.icon === 'edit' ? <Edit /> : <Delete />}
        </span>
        <span class="hidden group-hover:block">
          {props.icon === 'edit' ? <EditHover /> : <DeleteHover />}
        </span>
      </button>
    )
  },
})
</script>
