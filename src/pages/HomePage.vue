<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello {{ authStore.user.attributes.first_name }}</h1>

    <!-- Navigation -->
    <nav>
      <NavigationBar>
        <template #ip_address>
          <IpManagementTab />
        </template>
        <template #audit_log>
          <AuditLogTab />
        </template>
      </NavigationBar>
      <button @click.prevent="logoutUser">Logout</button>
    </nav>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import NavigationBar from '@/components/NavigationBar.vue'
import IpManagementTab from '@/components/IpManagementTab.vue'
import AuditLogTab from '@/components/AuditLogTab.vue'
import { useToastStore } from '@/stores/toast'

const router = useRouter()
const { errors, logout } = useAuth()
const authStore = useAuthStore()
const toast = useToastStore()

const logoutUser = async () => {
  await logout()

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')
    return
  }

  toast.showToast('Logged out successfully', 'success')
}

const checkToken = async () => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
  }
}

onMounted(() => {
  checkToken()
})
</script>
