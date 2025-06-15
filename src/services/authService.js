import api from '../plugins/api';

export async function login(email, password) {
  try {
    const response = await api.post('/api/auth/login', {
      data: {
        attributes: {
          email: email,
          password: password
        }
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
