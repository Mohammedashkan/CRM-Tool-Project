const STORAGE_KEY = 'ashkan_crm_auth';

export function saveAuthTokens(data: { accessToken: string; refreshToken: string; user: any }) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAuthTokens() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuthTokens() {
  window.localStorage.removeItem(STORAGE_KEY);
}
