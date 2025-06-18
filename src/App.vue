<template>
  <div class="font-sans">
    <RouterView />
    <Toast />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Toast from './components/toasts/Toast.vue'
</script>
