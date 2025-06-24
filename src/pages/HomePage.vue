<template>
  <div id="main" class="min-h-screen">
    <!-- Header -->
    <HeaderSection class="flex justify-between h-14 bg-[#705ABF] py-2 px-4 w-full" />

    <!-- Navigation -->
    <Navigation>
      <template #ip_address>
        <IpManagementTab />
      </template>
      <template #audit_log>
        <AuditLogTab />
      </template>
    </Navigation>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderSection from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import IpManagementTab from '@/components/IpManagementTab.vue'
import AuditLogTab from '@/components/AuditLogTab.vue'

const router = useRouter()

const checkToken = async () => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
  }
}

onMounted(() => {
  checkToken()
})
</script>
