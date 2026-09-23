import axios from "axios";
import { clearSession } from "../auth/session";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(config.url?.startsWith("/Admin") ? "adminToken" : "jwtToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminRequest = error.config?.url?.startsWith("/Admin");
      const kind = isAdminRequest ? "admin" : "user";
      if (localStorage.getItem(kind === "admin" ? "adminToken" : "jwtToken")) {
        clearSession(kind);
        window.location.replace(kind === "admin" ? "/admin/login" : "/SignIn");
      }
    }
    return Promise.reject(error);
  }
);

export { baseURL };
export default apiClient;
