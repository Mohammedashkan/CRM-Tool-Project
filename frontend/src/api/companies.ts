import api from './axios';

export async function fetchCompanies() {
  const response = await api.get('/companies');
  return response.data.data;
}

export async function fetchCompany(id: string) {
  const response = await api.get(`/companies/${id}`);
  return response.data.data;
}

export async function createCompany(payload: any) {
  const response = await api.post('/companies', payload);
  return response.data.data;
}

export async function updateCompany(id: string, payload: any) {
  const response = await api.put(`/companies/${id}`, payload);
  return response.data.data;
}

export async function deleteCompany(id: string) {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
}
