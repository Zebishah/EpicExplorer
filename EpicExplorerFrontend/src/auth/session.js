import { jwtDecode } from "jwt-decode";

const keys = { user: "jwtToken", admin: "adminToken" };

export const clearSession = (kind = "user") => {
  localStorage.removeItem(keys[kind]);
  if (kind === "admin") localStorage.removeItem("adminProfile");
};

export const getSession = (kind = "user") => {
  const token = localStorage.getItem(keys[kind]);
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    if (payload.exp && payload.exp <= Math.floor(Date.now() / 1000)) {
      clearSession(kind);
      return null;
    }
    if (kind === "admin" && payload.type !== "admin") {
      clearSession("admin");
      return null;
    }
    if (kind === "user" && payload.type === "admin") return null;
    return { token, payload };
  } catch {
    clearSession(kind);
    return null;
  }
};

export const isUserAuthenticated = () => Boolean(getSession("user"));
export const isAdminAuthenticated = () => Boolean(getSession("admin"));
