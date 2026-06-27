import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";
import { ADMIN } from "@/constants/testIds";

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    try {
      const r = await api.get("/services");
      setServices(r.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        await api.put(`/admin/services/${editing.id}`, editing);
        toast.success("Service updated");
      } else {
        await api.post("/admin/services", editing);
        toast.success("Service created");
      }
      setEditing(null);
      fetch();
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (service) => {
    try {
      await api.put(`/admin/services/${service.id}`, { isActive: !service.isActive });
      toast.success(service.isActive ? "Service deactivated" : "Service activated");
      fetch();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="font-body text-sm text-[#94A3B8]">{services.length} services</p>
          <button
            onClick={() => setEditing({ name: "", description: "", startingPrice: 0, duration: "", isActive: true })}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2.5 rounded-xl font-body font-bold text-sm btn-blue-glow"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <table data-testid={ADMIN.servicesTable} className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                {["Service", "Category", "Starting Price", "Duration", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center font-body text-sm text-[#94A3B8]">Loading...</td></tr>
              ) : services.map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={s.image} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
                      <span className="font-body text-sm font-semibold text-[#0F172A]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${s.category === "commercial" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-[#2563EB]"}`}>
                      {s.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#0F172A]">
                    {s.priceType === "custom" ? "Custom" : `₹${s.startingPrice?.toLocaleString("en-IN")}`}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#475569]">{s.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${s.isActive ? "bg-green-50 text-[#22C55E]" : "bg-gray-100 text-[#94A3B8]"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditing({ ...s })} className="p-1.5 hover:bg-blue-50 rounded-lg text-[#2563EB]" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggle(s)} className={`p-1.5 rounded-lg transition-colors ${s.isActive ? "hover:bg-red-50 text-red-400" : "hover:bg-green-50 text-[#22C55E]"}`} title={s.isActive ? "Deactivate" : "Activate"}>
                        {s.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit/Create Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-[#0F172A] text-lg">{editing.id ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => setEditing(null)} className="text-[#94A3B8]"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Service Name", key: "name", type: "text" },
                  { label: "Starting Price (₹)", key: "startingPrice", type: "number" },
                  { label: "Duration", key: "duration", type: "text" },
                ].map(f => (
                  <div key={f.key}>
                    <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1 block">{f.label}</label>
                    <input type={f.type} value={editing[f.key] || ""} onChange={e => setEditing(ed => ({ ...ed, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1 block">Description</label>
                  <textarea rows={3} value={editing.description || ""} onChange={e => setEditing(ed => ({ ...ed, description: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:border-[#2563EB] resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 text-[#475569] py-3 rounded-xl font-body font-semibold text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-body font-bold text-sm btn-blue-glow disabled:opacity-70">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServicesPage;
