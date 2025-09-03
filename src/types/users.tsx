export interface User {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  mail: string;
  is_dietetician: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}