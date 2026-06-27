import api from './axios';

export async function fetchDeals() {
  const response = await api.get('/deals');
  return response.data.data;
}

export async function fetchDeal(id: string) {
  const response = await api.get(`/deals/${id}`);
  return response.data.data;
}

export async function createDeal(payload: any) {
  const response = await api.post('/deals', payload);
  return response.data.data;
}

export async function updateDeal(id: string, payload: any) {
  const response = await api.put(`/deals/${id}`, payload);
  return response.data.data;
}

export async function deleteDeal(id: string) {
  const response = await api.delete(`/deals/${id}`);
  return response.data;
}
