import axios from "axios";

export const API_URL = "http://localehost:4444/api";

const $api = axios.create({
   withCredentials: true,
   baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
   return config;
});

$api.interceptors.response.use((config) => {
   return config;
});

export default $api;
