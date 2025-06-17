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
const props = defineProps({
  paginationData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['page-change'])

const emitPageUpdate = (url) => {
  emit('page-change', new URL(url).searchParams.get('page'))
}
</script>
