import api from '../plugins/api'

export async function register(data) {
  try {
    const response = await api.post('/api/users', {
      data: {
        attributes: data,
      },
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}
