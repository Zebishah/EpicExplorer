import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearSession } from "../auth/session";

const links = [
  ["Overview", "/admin"], ["Users", "/admin/users"], ["Tours", "/admin/tours"], ["Hotels", "/admin/hotels"], ["Transports", "/admin/transports"], ["Bookings", "/admin/tour-bookings"], ["Reviews", "/admin/reviews"], ["Blogs", "/admin/blogs"], ["Categories", "/admin/categories"], ["Notifications", "/admin/notifications"], ["Payments", "/admin/payments"], ["Settings", "/admin/settings"],
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => { clearSession("admin"); navigate("/admin/login", { replace: true }); };
  return <div className="min-h-screen bg-slate-100 text-slate-900 md:flex">
    <aside className="w-full bg-slate-950 p-5 text-white md:min-h-screen md:w-64">
      <h1 className="text-xl font-bold">EpicExplorer Admin</h1>
      <nav className="mt-6 grid grid-cols-2 gap-2 md:block">{links.map(([label, path]) => <NavLink key={path} to={path} end={path === "/admin"} className={({ isActive }) => `mb-1 block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-indigo-600" : "text-slate-300 hover:bg-slate-800"}`}>{label}</NavLink>)}</nav>
      <button type="button" onClick={logout} className="mt-6 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300">Log out</button>
    </aside>
    <section className="min-w-0 flex-1 p-5 md:p-8"><Outlet /></section>
  </div>;
}
