import api from './axios';

export async function fetchContracts() {
  const response = await api.get('/contracts');
  return response.data.data;
}

export async function fetchContract(id: string) {
  const response = await api.get(`/contracts/${id}`);
  return response.data.data;
}

export async function createContract(payload: any) {
  const response = await api.post('/contracts', payload);
  return response.data.data;
}

export async function updateContract(id: string, payload: any) {
  const response = await api.put(`/contracts/${id}`, payload);
  return response.data.data;
}

export async function deleteContract(id: string) {
  const response = await api.delete(`/contracts/${id}`);
  return response.data;
}
