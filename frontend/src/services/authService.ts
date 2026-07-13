import api from "./api";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function register(request: RegisterRequest) {

  const response = await api.post(
    "/auth/register",
    request
  );

  return response.data.data;
}

export async function login(request: LoginRequest) {

  const response = await api.post(
    "/auth/login",
    request
  );

  return response.data.data;
}