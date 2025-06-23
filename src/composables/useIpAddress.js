import { ref } from 'vue'
import { createIp, listIp, updateIp, deleteIp } from '@/services/ipManagementService'
import { useIpManagementStore } from '@/stores/ipAddress'

export function useIpAddress() {
  const store = useIpManagementStore()
  const loading = ref(false)
  const errors = ref(null)

  async function create(data) {
    loading.value = true
    errors.value = null

    try {
      const response = await createIp(data)

      if (response.error) throw response.error
    } catch (e) {
      errors.value = e.error.errors
    } finally {
      loading.value = false
    }
  }

  async function destroy(id) {
    loading.value = true
    errors.value = null

    try {
      const response = await deleteIp(id)

      if (response.error) throw response.error
    } catch (err) {
      errors.value = err
    } finally {
      loading.value = false
    }
  }

  async function list() {
    loading.value = true
    errors.value = null

    try {
      const response = await listIp(store.query)

      if (response.error) throw response.error

      const { data, links, meta } = response

      store.setList({
        data: data,
        links: links,
        meta: meta,
      })
    } catch (err) {
      errors.value = err
    } finally {
      loading.value = false
    }
  }

  async function update(id, data) {
    loading.value = true
    errors.value = null

    try {
      const response = await updateIp(id, data)

      if (response.error) throw response.error
    } catch (e) {
      errors.value = e.error.errors
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
