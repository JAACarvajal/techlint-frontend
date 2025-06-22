<template>
  <div class="flex justify-center pt-10">
    <a
      v-for="(page, index) in paginationData.links"
      :key="index"
      :class="[
        'text-[#705ABF] mx-1.5 px-2.5 rounded-xs font-medium hover:bg-[#544191] hover:text-white duration-100 cursor-pointer',
        page.active ? 'bg-[#544191] text-white' : '',
      ]"
      @click.prevent="emitPageUpdate(page.url)"
    >
      {{ pageText(page.label) }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  paginationData: { type: Object, required: true },
})

const emit = defineEmits(['page:change'])

function emitPageUpdate(url) {
  emit('page:change', new URL(url).searchParams.get('page'))
}

function pageText(label) {
  if (label === 'Next &raquo;') return '⮞'
  if (label === '&laquo; Previous') return '⮜'
  return label
}
</script>
