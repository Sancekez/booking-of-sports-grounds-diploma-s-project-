import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/response/AuthResponse";

export async function GetQuizes(): Promise<AxiosResponse> {
   return $api.get<AuthResponse>("/quizes");
}
