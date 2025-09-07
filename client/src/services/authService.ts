import api from "../shared/api/api.ts";

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};
