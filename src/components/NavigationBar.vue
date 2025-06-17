<template>
  <div class="tabs">
    <div class="tab-headers">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.name"
        :class="{ active: idx === activeTab, hidden: !tab.visible }"
        @click="activeTab = idx"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-content">
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

<style scoped>
.hidden {
  display: none;
}
.tabs {
  border: 1px solid #ccc;
  border-radius: 4px;
}
.tab-headers {
  display: flex;
  border-bottom: 1px solid #ccc;
}
.tab-headers button {
  background: none;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  transition: border 0.2s;
}
.tab-headers button.active {
  border-bottom: 2px solid #42b983;
  color: #42b983;
  font-weight: bold;
}
.tab-content {
  padding: 16px;
}
</style>
