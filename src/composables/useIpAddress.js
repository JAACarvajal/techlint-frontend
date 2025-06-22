import { ref } from 'vue'
import { createIp, listIp, updateIp, deleteIp } from '@/services/ipManagementService'
import { useIpManagementStore } from '@/stores/ipAddress'

export function useIpAddress() {
  const store = useIpManagementStore()
  const loading = ref(false)
  const errors = ref(null)

  async function create(data) {
    loading.value = true

    try {
      await createIp(data)

      list()
    } finally {
      loading.value = false
    }
  }

  async function destroy(id) {
    loading.value = true

    try {
      await deleteIp(id)

      list()
    } finally {
      loading.value = false
    }
  }

  async function list() {
    loading.value = true

    try {
      const { data, links, meta } = await listIp(store.query)

      store.setList({
        data: data,
        links: links,
        meta: meta,
      })
    } finally {
      loading.value = false
    }
  }

  async function update(id, data) {
    loading.value = true

    try {
      await updateIp(id, data)

      list()
    } finally {
      loading.value = false
    }
  }

  return {
    create,
    destroy,
    list,
    loading,
    update,
    errors,
  }
}
