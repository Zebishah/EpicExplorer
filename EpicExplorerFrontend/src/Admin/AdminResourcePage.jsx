import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/client";
import { STATIC_IMAGE_OPTIONS } from "../utils/entityImages";

const labels = { users: "Users", tours: "Tours", hotels: "Hotels", rooms: "Rooms", transports: "Transports", blogs: "Blogs", categories: "Categories", reviews: "Reviews", "tour-bookings": "Tour bookings", "hotel-bookings": "Hotel bookings", "transport-bookings": "Transport bookings", notifications: "Notifications", payments: "Payments" };

const imageResourceTypes = { transports: ["transport", "image"], tours: ["tour", "image"], hotels: ["hotel", "image"], rooms: ["room", "image"], blogs: ["blog", "pic"] };

const entityConfigs = {
  tours: {
    title: "Tour",
    type: "tour",
    fields: [["name", "Name", "text"], ["price", "Price", "number"], ["startDate", "Start date", "date"], ["endDate", "End date", "date"], ["parentCategory", "Category", "text"], ["description", "Description", "textarea"], ["type", "Tour type", "text"], ["departureTime", "Departure time", "time"], ["Departure_ReturnLocation", "Departure and return location", "text"], ["available", "Availability", "text"], ["bookedCount", "Booked count", "text"], ["membersLimit", "Members limit", "number"], ["tourLocation", "Tour location", "text"], ["Collection", "Collection", "text"], ["ReviewsGiven", "Reviews given", "number"]],
    defaults: { name: "", price: "", startDate: "", endDate: "", parentCategory: "", description: "", image: "", type: "", departureTime: "", Departure_ReturnLocation: "", available: "true", bookedCount: "0", membersLimit: "1", tourLocation: "", Collection: "", ReviewsGiven: "0", gallery: "" },
    arrays: ["gallery"],
  },
  hotels: {
    title: "Hotel",
    type: "hotel",
    fields: [["name", "Name", "text"], ["prices", "Price", "text"], ["roomCount", "Room count", "number"], ["description", "Description", "textarea"], ["location", "Location", "text"], ["available", "Availability", "text"], ["ReviewsCount", "Reviews count", "text"]],
    defaults: { name: "", prices: "", roomCount: "1", description: "", image: "", location: "", available: "true", ReviewsCount: "0", gallery: "", features: "" },
    arrays: ["gallery", "features"],
  },
  transports: {
    title: "Transport",
    type: "transport",
    fields: [["carName", "Vehicle name", "text"], ["prices", "Price", "number"], ["seats", "Seats", "number"], ["type", "Transport type", "text"], ["description", "Description", "textarea"], ["allowedGuests", "Allowed guests", "text"], ["available", "Availability", "text"]],
    defaults: { carName: "", prices: "", seats: "", type: "", description: "", image: "", allowedGuests: "", available: "true", gallery: "", features: "" },
    arrays: ["gallery", "features"],
  },
};

const readJson = (value) => { try { return JSON.parse(value); } catch { return null; } };
const splitList = (value) => String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
const formFromRow = (config, row) => Object.fromEntries(Object.keys(config.defaults).map((key) => [key, Array.isArray(row[key]) ? row[key].join(", ") : String(row[key] ?? "")]));
const payloadFromForm = (config, form) => {
  const payload = { ...form };
  config.arrays.forEach((key) => { payload[key] = splitList(form[key]); });
  ["price", "roomCount", "membersLimit", "ReviewsGiven", "seats"].forEach((key) => { if (key in payload && payload[key] !== "") payload[key] = Number(payload[key]); });
  return payload;
};

export default function AdminResourcePage() {
  const { resource } = useParams();
  const [result, setResult] = useState({ data: [], pagination: {} });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [editor, setEditor] = useState(null);
  const imageConfig = imageResourceTypes[resource];
  const imageType = imageConfig?.[0];
  const imageField = imageConfig?.[1];
  const entityConfig = entityConfigs[resource];
  const imageOptions = useMemo(() => (imageType ? STATIC_IMAGE_OPTIONS[imageType] || [] : []), [imageType]);

  const load = useCallback(() => {
    setError("");
    apiClient.get(`/Admin/panel/${resource}`, { params: { page, search, limit: 20 } }).then(({ data }) => setResult(data)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load records."));
  }, [resource, page, search]);
  useEffect(() => { load(); }, [load]);

  const rows = result.data || [];
  const columns = rows.length ? Object.keys(rows[0]).filter((key) => !["__v", "SecretSeed", "password"].includes(key)).slice(0, 7) : [];
  const readOnly = ["reviews", "tour-bookings", "hotel-bookings", "transport-bookings", "payments", "notifications"].includes(resource);
  const openNewEditor = () => setEditor(entityConfig ? { form: { ...entityConfig.defaults } } : { value: imageField ? JSON.stringify({ [imageField]: "" }, null, 2) : "{}" });
  const openExistingEditor = (row) => setEditor(entityConfig ? { id: row._id, form: formFromRow(entityConfig, row) } : { id: row._id, value: JSON.stringify(row, null, 2) });
  const updateForm = (key, value) => setEditor((current) => ({ ...current, form: { ...current.form, [key]: value } }));
  const changeImage = (value) => {
    if (entityConfig) { updateForm("image", value); return; }
    const current = readJson(editor.value);
    if (!current) { setError("Enter valid JSON before selecting an image."); return; }
    setEditor({ ...editor, value: JSON.stringify({ ...current, [imageField]: value }, null, 2) });
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    try { await apiClient.delete(`/Admin/panel/${resource}/${id}`); load(); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to delete record."); }
  };
  const save = async (event) => {
    event.preventDefault();
    try {
      const payload = entityConfig ? payloadFromForm(entityConfig, editor.form) : JSON.parse(editor.value);
      if (editor.id) await apiClient.patch(`/Admin/panel/${resource}/${editor.id}`, payload);
      else await apiClient.post(`/Admin/panel/${resource}`, payload);
      setEditor(null); load();
    } catch (requestError) { setError(requestError.response?.data?.message || (requestError instanceof SyntaxError ? "Enter valid JSON." : "Unable to save record.")); }
  };

  return <div>
    <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Admin management</p>
    <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="mt-2 text-4xl font-bold">{labels[resource] || resource}</h2><p className="mt-2 text-sm text-slate-500">Search, inspect, and manage live database records.</p></div>{!readOnly && <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white" onClick={openNewEditor}>New record</button>}</div>
    <div className="mt-6 flex gap-2"><input className="w-full max-w-md rounded-lg border bg-white p-3" placeholder="Search records…" value={search} onChange={(event) => { setPage(1); setSearch(event.target.value); }} /></div>
    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
    <div className="mt-5 overflow-auto rounded-xl border bg-white shadow-sm"><table className="min-w-full text-left text-sm"><thead><tr className="border-b bg-slate-50">{columns.map((column) => <th className="whitespace-nowrap p-3 font-semibold" key={column}>{column}</th>)}{!readOnly && <th className="p-3">Actions</th>}</tr></thead><tbody>{rows.map((row) => <tr className="border-b last:border-0" key={row._id}>{columns.map((column) => <td className="max-w-xs truncate p-3" key={column}>{typeof row[column] === "object" ? JSON.stringify(row[column]) : String(row[column] ?? "—")}</td>)}{!readOnly && <td className="whitespace-nowrap p-3"><button className="mr-3 text-indigo-600" onClick={() => openExistingEditor(row)}>Edit</button><button className="text-red-600" onClick={() => remove(row._id)}>Delete</button></td>}</tr>)}{!rows.length && <tr><td className="p-8 text-center text-slate-500" colSpan={Math.max(columns.length + (readOnly ? 0 : 1), 1)}>No records found.</td></tr>}</tbody></table></div>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-600"><span>{result.pagination?.total || 0} total records</span><div className="flex gap-2"><button className="rounded border bg-white px-3 py-2 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</button><span className="px-2 py-2">Page {page} of {Math.max(1, result.pagination?.pages || 1)}</span><button className="rounded border bg-white px-3 py-2 disabled:opacity-40" disabled={page >= (result.pagination?.pages || 1)} onClick={() => setPage((value) => value + 1)}>Next</button></div></div>
    {editor && <form onSubmit={save} className="mt-6 rounded-xl border bg-white p-5 shadow-sm"><h3 className="font-bold">{editor.id ? "Edit record" : "Create record"}</h3><p className="mt-1 text-sm text-slate-500">Complete the required fields before saving.</p>{entityConfig ? <><div className="mt-4 grid gap-4 md:grid-cols-2">{entityConfig.fields.map(([key, label, type]) => <label className={type === "textarea" ? "md:col-span-2" : ""} key={key}><span className="text-sm font-semibold text-slate-700">{label}</span>{type === "textarea" ? <textarea className="mt-1 min-h-24 w-full rounded-lg border p-3" value={editor.form[key]} onChange={(event) => updateForm(key, event.target.value)} required /> : <input className="mt-1 w-full rounded-lg border p-3" type={type} value={editor.form[key]} onChange={(event) => updateForm(key, event.target.value)} required />}</label>)}</div><label className="mt-4 block"><span className="text-sm font-semibold text-slate-700">Image URL or project path</span><input className="mt-1 w-full rounded-lg border p-3" type="text" placeholder="/images/tours/mountains.jpg or https://example.com/image.jpg" value={editor.form.image} onChange={(event) => updateForm("image", event.target.value)} required /><span className="mt-1 block text-xs text-slate-500">Use a project path such as /images/transports/bmw.jpg. External URLs are accepted for future compatibility.</span></label><label className="mt-4 block"><span className="text-sm font-semibold text-slate-700">Choose a project image</span><select className="mt-1 w-full rounded-lg border bg-white p-3" value={editor.form.image} onChange={(event) => updateForm("image", event.target.value)}><option value="">Keep typed image path</option>{imageOptions.map(([label, value]) => <option value={value} key={value}>{label} — {value}</option>)}</select></label>{entityConfig.arrays.map((key) => <label className="mt-4 block" key={key}><span className="text-sm font-semibold text-slate-700">{key === "gallery" ? "Gallery image paths" : "Features"}</span><input className="mt-1 w-full rounded-lg border p-3" type="text" value={editor.form[key]} onChange={(event) => updateForm(key, event.target.value)} placeholder="Separate multiple values with commas" /><span className="mt-1 block text-xs text-slate-500">Separate multiple values with commas.</span></label>)}</> : <>{imageField && <label className="mt-4 block text-sm font-semibold text-slate-700">{imageField === "pic" ? "Blog image" : "Entity image"}<select className="mt-2 w-full rounded-lg border bg-white p-3 font-normal" value={readJson(editor.value)?.[imageField] || ""} onChange={(event) => changeImage(event.target.value)}><option value="">Use fallback when no image is set</option>{imageOptions.map(([label, value]) => <option value={value} key={value}>{label} — {value}</option>)}</select></label>}<textarea className="mt-4 min-h-64 w-full rounded-lg border p-3 font-mono text-sm" value={editor.value} onChange={(event) => setEditor({ ...editor, value: event.target.value })} required /></>}<div className="mt-4 flex gap-2"><button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">Save</button><button type="button" className="rounded-lg border px-4 py-2" onClick={() => setEditor(null)}>Cancel</button></div></form>}
  </div>;
}
