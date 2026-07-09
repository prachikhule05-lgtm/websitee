import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Check, X } from "lucide-react";
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
            onClick={() => setEditing({ 
              name: "", description: "", startingPrice: 0, duration: "", 
              image: "", category: "residential", isActive: true 
            })}
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
                      <img src={s.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&q=80"} alt={s.name} className="w-10 h-10 rounded-xl object-cover bg-gray-100" />
                      <span className="font-body text-sm font-semibold text-[#0F172A]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize bg-blue-50 text-[#2563EB]">
                      {s.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#0F172A]">
                    {s.priceType === "custom" ? "Custom" : `₹${s.startingPrice?.toLocaleString("en-IN")}`}
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-[#1E293B]">{s.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${s.isActive ? "bg-green-50 text-[#10B981]" : "bg-gray-100 text-[#94A3B8]"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditing({ ...s })} className="p-1.5 hover:bg-blue-50 rounded-lg text-[#2563EB]" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggle(s)} className={`p-1.5 rounded-lg transition-colors ${s.isActive ? "hover:bg-red-50 text-red-400" : "hover:bg-green-50 text-[#10B981]"}`} title={s.isActive ? "Deactivate" : "Activate"}>
                        {s.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl my-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-[#0F172A] text-lg">{editing.id ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => setEditing(null)} className="text-[#94A3B8]"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Service Name</label>
                  <input type="text" value={editing.name} onChange={e => setEditing(ed => ({ ...ed, name: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" />
                </div>
                
                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Category</label>
                  <select value={editing.category} onChange={e => setEditing(ed => ({ ...ed, category: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none bg-white">
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="sofa">Sofa</option>
                    <option value="carpet">Carpet</option>
                    <option value="move-in-out">Move-In/Out</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Image URL</label>
                  <input type="text" value={editing.image || ""} onChange={e => setEditing(ed => ({ ...ed, image: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Price (₹)</label>
                    <input type="number" value={editing.startingPrice} onChange={e => setEditing(ed => ({ ...ed, startingPrice: Number(e.target.value) }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Duration</label>
                    <input type="text" value={editing.duration} onChange={e => setEditing(ed => ({ ...ed, duration: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 py-3 rounded-xl font-bold text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-bold text-sm">
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
