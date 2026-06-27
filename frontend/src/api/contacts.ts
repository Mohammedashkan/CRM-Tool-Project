import api from './axios';

export async function fetchContacts() {
  const response = await api.get('/contacts');
  return response.data.data;
}

export async function fetchContact(id: string) {
  const response = await api.get(`/contacts/${id}`);
  return response.data.data;
}

export async function createContact(payload: any) {
  const response = await api.post('/contacts', payload);
  return response.data.data;
}

export async function updateContact(id: string, payload: any) {
  const response = await api.put(`/contacts/${id}`, payload);
  return response.data.data;
}

export async function deleteContact(id: string) {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
}
