import React, { useState, useEffect } from "react";
import { Check, X, Trash2, Star, Clock, ThumbsUp, ThumbsDown, RotateCcw, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "./AdminDashboardPage";
import api, { formatApiError } from "@/utils/api";
import { ADMIN } from "@/constants/testIds";

const STATUS_CONFIG = {
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  approved: { label: "Approved", bg: "bg-green-50", text: "text-[#10B981]", border: "border-green-200" },
  rejected: { label: "Rejected", bg: "bg-red-50", text: "text-red-500", border: "border-red-200" },
};

const DeleteConfirmModal = ({ review, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full z-10"
    >
      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Trash2 className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="font-heading font-bold text-lg text-[#0F172A] text-center mb-1">Delete Review?</h3>
      <p className="font-body text-sm text-[#1E293B] text-center mb-2">
        This will permanently delete the review by <strong>{review?.customerName}</strong>.
      </p>
      <p className="font-body text-xs text-[#94A3B8] text-center mb-5">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 font-body font-semibold text-sm text-[#1E293B] hover:border-gray-300 transition-all">
          Cancel
        </button>
        <button onClick={onConfirm}
          data-testid="confirm-delete-btn"
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 font-body font-semibold text-sm text-white transition-all">
          Delete
        </button>
      </div>
    </motion.div>
  </div>
);

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  const cfg = STATUS_CONFIG[review.status] || STATUS_CONFIG.pending;
  const dateStr = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`bg-white rounded-2xl p-5 border shadow-sm transition-shadow hover:shadow-md ${review.status === "pending" ? "border-amber-200" : "border-gray-100"}`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
          {review.customerImage ? (
            <img src={review.customerImage} alt={review.customerName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#F59E0B] flex items-center justify-center text-white font-heading font-bold text-lg">
              {review.customerName?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-heading font-bold text-sm text-[#0F172A]">{review.customerName}</span>
                <span className={`font-body text-[11px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                  {cfg.label}
                </span>
                {review.status === "pending" && (
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-body text-xs text-[#1E293B]">{review.service || "General"}</span>
                <span className="text-gray-300">·</span>
                <span className="font-body text-xs text-[#94A3B8] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {dateStr}
                </span>
              </div>
            </div>
            {/* Stars */}
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200"}`} />
              ))}
            </div>
          </div>

          {/* Review text */}
          <p className="font-body text-sm text-[#1E293B] leading-relaxed mt-2 mb-3">{review.text}</p>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {review.status !== "approved" && (
              <button
                data-testid="approve-review-btn"
                onClick={() => onUpdate(review.id, "approved")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-[#10B981] rounded-xl font-body text-xs font-bold transition-all border border-green-200"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Approve
              </button>
            )}
            {review.status !== "rejected" && (
              <button
                data-testid="reject-review-btn"
                onClick={() => onUpdate(review.id, "rejected")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-body text-xs font-bold transition-all border border-red-200"
              >
                <ThumbsDown className="w-3.5 h-3.5" /> Reject
              </button>
            )}
            {review.status !== "pending" && (
              <button
                data-testid="reset-review-btn"
                onClick={() => onUpdate(review.id, "pending")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl font-body text-xs font-bold transition-all border border-amber-200"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            )}
            <button
              data-testid="delete-review-btn"
              onClick={() => onDelete(review)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-[#94A3B8] hover:text-red-500 rounded-xl font-body text-xs font-bold transition-all border border-gray-200 hover:border-red-200 ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchReviews = async () => {
    try {
      const r = await api.get("/admin/reviews");
      setReviews(r.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleUpdate = async (id, status) => {
    setUpdating(id);
    try {
      await api.put(`/admin/reviews/${id}`, { status });
      toast.success(`Review ${status}`);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      toast.error(formatApiError(err));
    }
    setUpdating(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/reviews/${deleteTarget.id}`);
      toast.success("Review deleted");
      setReviews(prev => prev.filter(r => r.id !== deleteTarget.id));
    } catch (err) {
      toast.error(formatApiError(err));
    }
    setDeleteTarget(null);
  };

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
  };

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  const TABS = [
    { key: "all", label: "All", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { key: "pending", label: "Pending", icon: <Clock className="w-3.5 h-3.5" /> },
    { key: "approved", label: "Approved", icon: <ThumbsUp className="w-3.5 h-3.5" /> },
    { key: "rejected", label: "Rejected", icon: <ThumbsDown className="w-3.5 h-3.5" /> },
  ];

  return (
    <AdminLayout title="Reviews Management">
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            review={deleteTarget}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <div className="space-y-5">
        {/* Stats row */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total", value: counts.all, color: "text-[#2563EB]", bg: "bg-blue-50" },
              { label: "Pending", value: counts.pending, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Approved", value: counts.approved, color: "text-[#10B981]", bg: "bg-green-50" },
              { label: "Rejected", value: counts.rejected, color: "text-red-500", bg: "bg-red-50" },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl px-4 py-3 text-center`}>
                <div className={`font-heading font-extrabold text-2xl ${stat.color}`}>{stat.value}</div>
                <div className="font-body text-xs text-[#1E293B] font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.key}
              data-testid={`review-filter-${tab.key}`}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-body text-sm font-semibold capitalize transition-all ${
                filter === tab.key
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-[#1E293B] hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-[#94A3B8]"}`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Review cards */}
        <div data-testid={ADMIN.reviewsTable} className="space-y-3">
          {loading ? (
            <div className="bg-white rounded-2xl p-10 text-center font-body text-sm text-[#94A3B8]">Loading reviews...</div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="font-body text-sm text-[#94A3B8]">No {filter !== "all" ? filter : ""} reviews found</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map(r => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  onUpdate={handleUpdate}
                  onDelete={setDeleteTarget}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pending action banner */}
        {counts.pending > 0 && filter !== "pending" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="font-body text-sm font-semibold text-amber-700">
                {counts.pending} review{counts.pending > 1 ? "s" : ""} awaiting moderation
              </span>
            </div>
            <button
              onClick={() => setFilter("pending")}
              className="font-body text-xs font-bold text-amber-700 hover:underline"
            >
              Review now →
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;
