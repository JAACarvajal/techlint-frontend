<template>
  <div class="w-full rounded-lg">
    <table class="w-full">
      <tbody>
        <!-- Headers -->
        <tr class="border border-[#444250]">
          <th
            v-for="header in props.headers"
            class="text-[14px] px-4 py-6 text-white bg-[#444250] font-medium"
            :key="header.key"
            @click.prevent="emit('sort:toggle', header.key)"
          >
            {{ header.label }}
          </th>
          <th class="p-3 text-white bg-[#444250]" v-if="withActions">Actions</th>
        </tr>
        <!-- End of Headers -->

        <!-- Rows -->
        <tr v-for="ip in props.data" :key="ip.id" class="text-[#444250] border-1 border-[#e9eff5]">
          <td v-for="header in props.headers" :key="header.key" class="px-4 py-6 text-center">
            {{ ip.attributes[header.key] }}
          </td>
          <td v-if="withActions">
            <div class="flex flex-row justify-center">
              <button
                type="button"
                @click.prevent="emit('toggle:edit', ip.id)"
                v-if="
                  authStore.user?.attributes?.is_admin ||
                  authStore.user?.id === ip.attributes.user_id
                "
                class="cursor-pointer m-1"
              >
                <Edit />
              </button>
              <button
                v-if="authStore.user?.attributes?.is_admin"
                type="button"
                @click.prevent="emit('delete', ip.id)"
                class="cursor-pointer m-1"
              >
                <Delete />
              </button>
            </div>
          </td>
        </tr>
        <!-- End of rows -->
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import Edit from '@/components/icons/edit.svg'
import EditHover from '@/components/icons/edit_hover.svg'
import Delete from '@/components/icons/delete.svg'
import DeleteHover from '@/components/icons/delete_hover.svg'

const emit = defineEmits(['toggle:edit', 'delete', 'sort:toggle'])
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  headers: {
    type: Array,
    default: () => [],
  },
  withActions: {
    type: Boolean,
    default: true,
  },
})

const authStore = useAuthStore()
</script>

<style lang="scss" scoped></style>
