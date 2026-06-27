import api from './axios';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  return response.data.data;
}

export async function refreshAuthToken(refreshToken: string) {
  const response = await api.post('/auth/refresh', { refreshToken });
  return response.data.data;
}

export async function logout(refreshToken: string) {
  const response = await api.post('/auth/logout', { refreshToken });
  return response.data;
}
