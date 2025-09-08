interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}
