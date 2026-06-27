import React, { useState, useEffect } from "react";
import { Check, X, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";
import { ADMIN } from "@/constants/testIds";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetch = async () => {
    try {
      const r = await api.get("/admin/reviews");
      setReviews(r.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const update = async (id, status) => {
    try {
      await api.put(`/admin/reviews/${id}`, { status });
      toast.success(`Review ${status}`);
      fetch();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
      toast.success("Review deleted");
      fetch();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  const statusColor = (s) => {
    if (s === "approved") return "bg-green-50 text-[#22C55E]";
    if (s === "rejected") return "bg-red-50 text-red-500";
    return "bg-orange-50 text-[#F97316]";
  };

  return (
    <AdminLayout title="Reviews Management">
      <div className="space-y-5">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "approved", "rejected"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-body text-sm font-semibold capitalize transition-all ${filter === f ? "bg-[#2563EB] text-white" : "bg-white border border-gray-200 text-[#475569] hover:border-[#2563EB]"}`}>
              {f} ({f === "all" ? reviews.length : reviews.filter(r => r.status === f).length})
            </button>
          ))}
        </div>

        <div data-testid={ADMIN.reviewsTable} className="grid gap-4">
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center font-body text-sm text-[#94A3B8]">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center font-body text-sm text-[#94A3B8]">No reviews found</div>
          ) : filtered.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    {r.customerImage ? (
                      <img src={r.customerImage} alt={r.customerName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#F97316] flex items-center justify-center text-white font-bold">
                        {r.customerName?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-heading font-bold text-sm text-[#0F172A]">{r.customerName}</span>
                      <span className="font-body text-xs text-[#94A3B8]">·</span>
                      <span className="font-body text-xs text-[#475569]">{r.service}</span>
                      <span className={`font-body text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColor(r.status)}`}>{r.status}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < (r.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="font-body text-sm text-[#475569] leading-relaxed">{r.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {r.status !== "approved" && (
                    <button onClick={() => update(r.id, "approved")} className="p-1.5 hover:bg-green-50 rounded-lg text-[#22C55E] transition-colors" title="Approve">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button onClick={() => update(r.id, "rejected")} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Reject">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => remove(r.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;
