import axios from 'axios';
import { getAuthTokens } from '../utils/storage';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const authTokens = getAuthTokens();
  if (authTokens?.accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authTokens.accessToken}`
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response?.data || error);
  }
);

export default api;
