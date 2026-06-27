export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
