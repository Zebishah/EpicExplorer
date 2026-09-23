import { useEffect, useState } from "react";
import apiClient from "../api/client";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { apiClient.get("/Admin/panel/dashboard").then(({ data }) => setDashboard(data.data)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load dashboard.")); }, []);
  const counts = dashboard?.counts || {};
  const cards = [["Users", counts.users], ["Active users", counts.activeUsers], ["Pending verification", counts.pendingVerification], ["Tours", counts.tours], ["Hotels", counts.hotels], ["Transports", counts.transports], ["Bookings", counts.bookings], ["Reviews", counts.reviews], ["Blogs", counts.blogs]];
  return <div><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Admin workspace</p><h2 className="mt-2 text-4xl font-bold">Platform overview</h2><p className="mt-2 text-slate-500">Live counts from the EpicExplorer database.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value]) => <div key={label} className="rounded-xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value ?? "—"}</p></div>)}</div><section className="mt-8 rounded-xl border bg-white p-5 shadow-sm"><h3 className="font-bold">Recent users</h3>{dashboard?.recentUsers?.length ? <div className="mt-4 overflow-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b text-slate-500"><th className="p-2">Username</th><th className="p-2">Email</th><th className="p-2">Verified</th></tr></thead><tbody>{dashboard.recentUsers.map((user) => <tr key={user._id} className="border-b last:border-0"><td className="p-2">{user.userName}</td><td className="p-2">{user.email}</td><td className="p-2">{user.verifiedStatus === "true" ? "Yes" : "No"}</td></tr>)}</tbody></table></div> : <p className="mt-3 text-sm text-slate-500">No users found.</p>}</section></div>;
}
