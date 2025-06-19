<template>
  <div>
    <!-- Navigation buttons -->
    <div class="flex shadow-md px-20 bg-white">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.name"
        :class="[
          'px-4 py-5 cursor-pointer text-md transition-[border] duration-300 border-b-2',
          idx === activeTab
            ? 'text-[#705ABF] border-b-[#705ABF] font-bold'
            : 'border-b-transparent',
          !tab.visible ? 'hidden' : '',
        ]"
        @click="activeTab = idx"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Slot content -->
    <div class="flex justify-center h-full">
      <slot :name="tabs[activeTab].name"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const activeTab = ref(0)
const tabs = [
  { name: 'ip_address', label: 'IP Addresses', visible: true },
  { name: 'audit_log', label: 'Audit Logs', visible: authStore.user?.attributes?.is_admin },
]
</script>
