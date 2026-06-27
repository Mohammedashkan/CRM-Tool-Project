import api from './axios';

export async function fetchTickets() {
  const response = await api.get('/tickets');
  return response.data.data;
}

export async function fetchTicket(id: string) {
  const response = await api.get(`/tickets/${id}`);
  return response.data.data;
}

export async function createTicket(payload: any) {
  const response = await api.post('/tickets', payload);
  return response.data.data;
}

export async function updateTicket(id: string, payload: any) {
  const response = await api.put(`/tickets/${id}`, payload);
  return response.data.data;
}

export async function deleteTicket(id: string) {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
}
