import { ref } from 'vue'
import { listLog } from '@/services/auditLogService'
import { useAuditLogStore } from '@/stores/auditLog'

export function useAuditLog() {
  const store = useAuditLogStore()
  const loading = ref(false)

  async function list() {
    loading.value = true

    try {
      const { data, links, meta } = await listLog(store.query)

      store.setList({
        data: data,
        links: links,
        meta: meta,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    list,
    loading,
  }
}
