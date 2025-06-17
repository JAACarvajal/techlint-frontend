<template>
  <div>
    <h1>Hi {{ authStore.user.attributes.first_name }}</h1>

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

const router = useRouter()
const { logout } = useAuth()
const authStore = useAuthStore()

const logoutUser = () => {
  try {
    logout()
  } catch (err) {
    alert('Logout failed: ' + (err?.message || err))
  }
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
