import api from "./api";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  userId: number;
  fullName: string;
  email: string;
}

export interface ProfileResponse {
  id: number;
  fullName: string;
  email: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const getProfile = async (email: string): Promise<ProfileResponse> => {
  const response = await api.get(`/profile?email=${encodeURIComponent(email)}`);
  return response.data;
};