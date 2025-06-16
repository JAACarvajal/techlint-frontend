import api from '../plugins/api'

export async function check() {
  try {
    const response = await api.get('/api/auth/check')

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function login(email, password) {
  try {
    const response = await api.post('/api/auth/login', {
      data: {
        attributes: {
          email: email,
          password: password,
        },
      },
    })

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function logout() {
  try {
    const response = await api.post('/api/auth/logout')

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function refresh() {
  try {
    const response = await api.post('/api/auth/refresh')

    return response
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}
