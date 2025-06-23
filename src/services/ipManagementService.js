import api from '../plugins/api'

export async function createIp(data) {
  try {
    const response = await api.post('/api/ip-addresses', {
      data: {
        attributes: data,
      },
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function listIp(queryParams) {
  try {
    const response = await api.get('/api/ip-addresses', {
      params: queryParams,
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function updateIp(id, data) {
  try {
    const response = await api.put(`/api/ip-addresses/${id}`, {
      data: {
        attributes: data,
      },
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function deleteIp(id) {
  try {
    const response = await api.delete(`/api/ip-addresses/${id}`)

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}
