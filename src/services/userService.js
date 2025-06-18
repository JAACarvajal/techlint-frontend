import api from '../plugins/api'

export async function registerUser(data) {
  try {
    const response = await api.post('/api/users', {
      data: {
        attributes: data,
      },
    })

    return response
  } catch (error) {
    return error.response.data
  }
}
