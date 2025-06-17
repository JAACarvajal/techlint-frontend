<template>
  <table>
    <tr>
      <th
        v-for="header in props.headers"
        :key="header.key"
        @click.prevent="emit('sort:toggle', header.key)"
      >
        {{ header.label }}
      </th>
      <th>Actions</th>
    </tr>
    <tr v-for="ip in props.data" :key="ip.id">
      <td v-for="header in props.headers" :key="header.key">
        {{ ip.attributes[header.key] }}
      </td>
      <td>
        <div>
          <button
            type="button"
            @click.prevent="emit('toggle:edit', ip.id)"
            v-if="
              authStore.user?.attributes?.is_admin || authStore.user?.id === ip.attributes.user_id
            "
          >
            Edit
          </button>
          <button
            v-if="authStore.user?.attributes?.is_admin"
            type="button"
            @click.prevent="emit('delete', ip.id)"
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

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
})

const authStore = useAuthStore()
</script>

<style lang="scss" scoped></style>
