import { Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getSession } from "../auth/session";

export default function AdminGate() {
  return getSession("admin") ? <AdminLayout /> : <Navigate to="/admin/login" replace />;
}
