<template>
  <form v-if="isShow">
    <slot name="form-header"></slot>
    <slot name="form-body"></slot>
  </form>
</template>

<script setup>
defineProps({
  isShow: {
    type: Boolean,
    default: true,
  },
})
</script>
