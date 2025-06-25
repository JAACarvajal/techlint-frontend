<template>
  <div :class="props.class">
    <div>
      <LogoIcon />
    </div>
    <div class="relative flex justify-between items-center gap-2">
      <UserIcon width="24" height="24" />
      <p class="text-white">Hi, {{ auth?.user?.attributes?.first_name }}</p>
      <div class="ml-1 cursor-pointer p-1" @click.prevent="toggleSettings">
        <ArrowDownIcon fill="#fff" />
        <ul
          ref="selectRef"
          v-show="showUserSetting"
          class="absolute z-100 w-[110px] right-0 top-8 mt-1 bg-white rounded shadow-lg max-h-60 overflow-y-auto transition-all"
        >
          <li
            class="cursor-pointer select-none px-4 py-2 hover:bg-[#D3C8F6] duration-100"
            @click.prevent="logoutUser"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToastStore } from '@/stores/toast'
import { useIpManagementStore } from '@/stores/ipAddress'
import { useAuditLogStore } from '@/stores/auditLog'
import { useAuthStore } from '@/stores/auth'
import { useClickOutside } from '@/composables/useClickOutside'
import LogoIcon from '@/components/icons/logo.svg'
import UserIcon from '@/components/icons/user_icon.svg'
import ArrowDownIcon from '@/components/icons/arrow_down.svg'

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})

const { errors, logout } = useAuth()
const selectRef = useClickOutside(() => (showUserSetting.value = false))
const toast = useToastStore()
const auth = useAuthStore()
const ipAddress = useIpManagementStore()
const auditLog = useAuditLogStore()
const showUserSetting = ref(false)

function toggleSettings() {
  showUserSetting.value = !showUserSetting.value
}

async function logoutUser() {
  await logout()

  if (errors.value) {
    toast.showToast(errors.value.message, 'error')
    return
  }

  ipAddress.$reset()
  auditLog.$reset()
  toast.showToast('Logged out successfully', 'success')
}
</script>
