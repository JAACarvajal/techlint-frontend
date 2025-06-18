import api from '../plugins/api'

export async function check() {
  try {
    const response = await api.get('/api/auth/check')

    return response
  } catch (err) {
    throw new Error(err.response.data.error.message)
  }
}

export async function login(data) {
  try {
    const response = await api.post('/api/auth/login', {
      data: {
        attributes: data,
      },
    })

    return response
  } catch (error) {
    return error.response.data
  }
}

export async function logout() {
  try {
    const response = await api.post('/api/auth/logout')

    return response
  } catch (err) {
    throw new Error(err.response.data.error.message)
  }
}

export async function refresh() {
  try {
    const response = await api.post('/api/auth/refresh')

    return response
  } catch (err) {
    throw new Error(err.response.data.error.message)
  }
}
