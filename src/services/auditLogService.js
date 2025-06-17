import api from '../plugins/api'

export async function listLog(queryParams) {
  try {
    const response = await api.get('/api/audit-logs', {
      params: queryParams,
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}
