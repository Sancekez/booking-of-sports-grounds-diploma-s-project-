import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/response/AuthResponse";

export async function login(
   email: string,
   password: string
): Promise<AxiosResponse<AuthResponse>> {
   return $api.post<AuthResponse>("/login", { email, password });
}

export async function registration(
   email: string,
   password: string
): Promise<AxiosResponse<AuthResponse>> {
   return $api.post<AuthResponse>("/login", { email, password });
}

export async function logout(): Promise<void> {
   return $api.post("/logout");
}
