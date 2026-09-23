import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import apiClient from "../api/client";
import { validateEmail } from "../utils/validation";
import { clearSession } from "../auth/session";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const error = validateEmail(email);
    if (error) return toast.error(error);
    setLoading(true);
    try {
      const { data } = await apiClient.post("/Admin/adminLogin", { email: email.trim().toLowerCase(), password });
      clearSession("user");
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminProfile", JSON.stringify(data.admin || {}));
      navigate("/admin", { replace: true });
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Unable to sign in to the admin panel.");
    } finally {
      setLoading(false);
    }
  };
  return <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <ToastContainer />
    <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">EpicExplorer</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin sign in</h1>
      <p className="mt-2 text-sm text-slate-500">Use an administrator account created by the bootstrap command.</p>
      <label className="mt-7 block text-sm font-medium text-slate-700">Email<input className="mt-1 w-full rounded-lg border p-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
      <label className="mt-4 block text-sm font-medium text-slate-700">Password<input className="mt-1 w-full rounded-lg border p-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
      <button className="mt-6 w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white disabled:opacity-60" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
    </form>
  </main>;
}
