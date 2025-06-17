<template>
  <div class="pagination">
    <a
      v-for="(page, index) in props.paginationData.links"
      :key="index"
      style="padding: 0 10px"
      href="#"
      @click.prevent="page.url && emitPageUpdate(page.url)"
      v-html="page.label"
    >
    </a>
  </div>
</template>

<script setup>
import { useIpManagementStore } from '@/stores/ipAddress'

const props = defineProps({
  paginationData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['page-change'])
const ipAddressStore = useIpManagementStore()

function emitPageUpdate(url) {
  ipAddressStore.setQueryPage(new URL(url).searchParams.get('page'))

  emit('page-change')
}
</script>
