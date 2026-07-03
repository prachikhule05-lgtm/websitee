import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Check, X, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";
import { ADMIN } from "@/constants/testIds";

const statusColors = {
  pending: "bg-amber-50 text-[#F59E0B]",
  confirmed: "bg-green-50 text-[#10B981]",
  completed: "bg-blue-50 text-[#2563EB]",
  cancelled: "bg-red-50 text-red-500",
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  // New States for User Messages (Leads)
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const r = await api.get(`/admin/bookings?search=${search}&status=${statusFilter}&limit=50`);
      setBookings(r.data.bookings || []);
      setTotal(r.data.total || 0);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      // Calls your backend route to get contact messages
      const r = await api.get("/admin/leads");
      setLeads(r.data.leads || r.data || []);
    } catch (err) {
      console.error("Leads fetch error:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => { 
    fetchBookings(); 
    fetchLeads();
  }, [search, statusFilter]);

  const updateStatus = async (bookingId, status) => {
    setUpdating(true);
    try {
      await api.put(`/admin/bookings/${bookingId}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
      if (selected?.bookingId === bookingId) setSelected(prev => ({ ...prev, status }));
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AdminLayout title="Booking & Messages Hub">
      <div className="space-y-12">
        
        {/* ==================== 1. BOOKINGS SECTION ==================== */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#0F172A] flex items-center gap-2">
            Active Bookings
          </h2>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input type="text" placeholder="Search bookings..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <p className="font-body text-sm text-[#94A3B8]">Showing {bookings.length} of {total} bookings</p>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table data-testid={ADMIN.bookingsTable} className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Booking ID", "Customer", "Service", "Property", "Date & Time", "Total", "Status", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center"><div className="spinner mx-auto !w-6 !h-6" style={{ borderColor: "#2563EB44", borderTopColor: "#2563EB", borderWidth: "2px" }} /></td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center font-body text-sm text-[#94A3B8]">No bookings found</td></tr>
                  ) : bookings.map(b => (
                    <tr key={b.bookingId} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-body text-sm font-semibold text-[#2563EB] whitespace-nowrap">{b.bookingId}</td>
                      <td className="px-4 py-3">
                        <div className="font-body text-sm font-semibold text-[#0F172A]">{b.customerName}</div>
                        <div className="font-body text-xs text-[#94A3B8]">{b.mobile}</div>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-[#1E293B] whitespace-nowrap">{b.service}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1E293B]">{b.propertyType}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1E293B] whitespace-nowrap">
                        <div>{b.date}</div>
                        <div className="text-[#94A3B8] text-xs">{b.time}</div>
                      </td>
                      <td className="px-4 py-3 font-body text-sm font-semibold text-[#0F172A]">
                        {b.grandTotal > 0 ? `₹${b.grandTotal?.toLocaleString("en-IN")}` : "Custom"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap ${statusColors[b.status] || "bg-gray-100 text-gray-600"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setSelected(b)} className="p-1.5 hover:bg-blue-50 rounded-lg text-[#2563EB] transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          {b.status === "pending" && (
                            <button onClick={() => updateStatus(b.bookingId, "confirmed")} className="p-1.5 hover:bg-green-50 rounded-lg text-[#10B981] transition-colors" title="Confirm"><Check className="w-4 h-4" /></button>
                          )}
                          {b.status !== "cancelled" && b.status !== "completed" && (
                            <button onClick={() => updateStatus(b.bookingId, "cancelled")} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors" title="Cancel"><X className="w-4 h-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==================== 2. USER MESSAGES SECTION ==================== */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="font-heading text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#F59E0B]" />
            User Messages & Inquiries (Leads)
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Sender Name", "Phone No.", "Email Address", "Requested Service", "Message Content", "Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loadingLeads ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center"><div className="spinner mx-auto !w-6 !h-6" style={{ borderColor: "#F59E0B44", borderTopColor: "#F59E0B", borderWidth: "2px" }} /></td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center font-body text-sm text-[#94A3B8]">No user messages found</td></tr>
                  ) : leads.map((lead, idx) => (
                    <tr key={lead._id || idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-body text-sm font-semibold text-[#0F172A]">{lead.name}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1E293B] whitespace-nowrap">{lead.phone}</td>
                      <td className="px-4 py-3 font-body text-sm text-[#1E293B]">{lead.email || "—"}</td>
                      <td className="px-4 py-3 font-body text-sm whitespace-nowrap">
                        <span className="bg-blue-50 text-[#2563EB] text-xs font-medium px-2.5 py-1 rounded-lg">
                          {lead.service || "General Inquiry"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-[#64748B] max-w-xs truncate">{lead.message}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedLead(lead)} className="p-1.5 hover:bg-amber-50 rounded-lg text-[#F59E0B] transition-colors" title="View Full Message">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Booking Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-[#0F172A] text-lg">{selected.bookingId}</h3>
                <button onClick={() => setSelected(null)} className="text-[#94A3B8] hover:text-[#0F172A]"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2.5">
                {[
                  ["Service", selected.service],
                  ["Property", selected.propertyType],
                  ["Location", selected.location],
                  ["Date & Time", `${selected.date} at ${selected.time}`],
                  ["Customer", selected.customerName],
                  ["Mobile", selected.mobile],
                  ["Email", selected.email || "—"],
                  ["Address", `${selected.houseNo}, ${selected.street}, ${selected.area}, ${selected.city} - ${selected.pincode}`],
                  ["Total", selected.grandTotal > 0 ? `₹${selected.grandTotal?.toLocaleString("en-IN")}` : "Custom Quote"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3 py-1.5 border-b border-gray-50">
                    <span className="font-body text-xs text-[#94A3B8] w-24 flex-shrink-0">{label}</span>
                    <span className="font-body text-sm text-[#0F172A]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Lead/Message Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-[#0F172A] text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#F59E0B]" /> Message Details
                </h3>
                <button onClick={() => setSelectedLead(null)} className="text-[#94A3B8] hover:text-[#0F172A]"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#94A3B8] block uppercase font-bold">From</label>
                  <p className="text-sm font-semibold text-[#0F172A]">{selectedLead.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[#94A3B8] block uppercase font-bold">Phone</label>
                    <p className="text-sm text-[#1E293B]">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-[#94A3B8] block uppercase font-bold">Email</label>
                    <p className="text-sm text-[#1E293B] truncate">{selectedLead.email || "—"}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#94A3B8] block uppercase font-bold">Requested Service</label>
                  <p className="text-sm text-[#1E293B]">{selectedLead.service || "General Question"}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <label className="text-xs text-[#94A3B8] block uppercase font-bold mb-1">Message</label>
                  <p className="text-sm text-[#0F172A] whitespace-pre-wrap leading-relaxed">{selectedLead.message}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminBookingsPage;
