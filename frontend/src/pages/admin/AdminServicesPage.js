import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Check, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";
import { ADMIN } from "@/constants/testIds";

// Define the mapping for display names
const CATEGORY_LABELS = {
  "full-house-deep-cleaning": "Full House Deep Cleaning",
  "commercial-post-interior": "Commercial Post Interior Cleaning Services",
  "customized-package": "Customized Cleaning Package",
  "residential": "Residential",
  "commercial": "Commercial",
  "kitchen": "Kitchen",
  "bathroom": "Bathroom",
  "sofa": "Sofa",
  "carpet": "Carpet",
  "move-in-out": "Move-In/Out"
};

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

        {/* ... (Table remains the same) */}

        {/* Modal for Add/Edit */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl my-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-[#0F172A] text-lg">{editing.id ? "Edit Service" : "Add Service"}</h3>
                <button onClick={() => setEditing(null)} className="text-[#94A3B8]"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Service Name</label>
                  <input type="text" value={editing.name} onChange={e => setEditing(ed => ({ ...ed, name: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" />
                </div>
                
                {/* --- NEW DESCRIPTION FIELD --- */}
                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Description</label>
                  <textarea 
                    rows={3}
                    value={editing.description || ""} 
                    onChange={e => setEditing(ed => ({ ...ed, description: e.target.value }))} 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none" 
                  />
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Category</label>
                  <select value={editing.category} onChange={e => setEditing(ed => ({ ...ed, category: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#2563EB] outline-none bg-white">
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                {/* ... (Rest of the fields remain the same) */}
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
                <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl font-bold text-sm">{saving ? "Saving..." : "Save Changes"}</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServicesPage;
