from pathlib import Path

TESTIMONIALS_CONTENT = '''import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`}
      />
    ))}
  </div>
);

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

const reviewsFromApi = (data) =>
  data.map((review) => ({
    id: review.id,
    name: review.name,
    service: review.service,
    rating: review.rating,
    review: review.review,
    date: formatDate(review.createdAt),
  }));

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] p-6 min-h-[350px] flex flex-col justify-between">
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StarRating rating={review.rating || 5} />
        <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#92400E]">
          {review.service}
        </span>
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold text-[#0F172A]">{review.name}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{review.review}</p>
      </div>
    </div>
    <div className="mt-6 text-sm text-slate-500">Reviewed on {review.date}</div>
  </div>
);

const ReviewSkeleton = () => (
  <div className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-6 min-h-[350px]">
    <div className="h-5 w-28 rounded-full bg-slate-200 mb-6" />
    <div className="h-4 w-40 rounded-full bg-slate-200 mb-4" />
    <div className="space-y-3">
      <div className="h-4 rounded-full bg-slate-200" />
      <div className="h-4 rounded-full bg-slate-200" />
      <div className="h-4 w-5/6 rounded-full bg-slate-200" />
    </div>
    <div className="mt-10 h-4 w-24 rounded-full bg-slate-200" />
  </div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState(SERVICES_STATIC);
  const [form, setForm] = useState({ name: "", service: "", rating: 0, review: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emblaApi, setEmblaApi] = useState(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/reviews");
      if (response.data && Array.isArray(response.data)) {
        setReviews(reviewsFromApi(response.data));
      }
    } catch {
      toast.error("Unable to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const response = await api.get("/services");
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setServices(response.data.map((service) => ({ name: service.name })));
      }
    } catch {
      setServices(SERVICES_STATIC);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    fetchServices();
  }, [fetchReviews, fetchServices]);

  useEffect(() => {
    if (!emblaApi || !autoPlay) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [emblaApi, autoPlay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.service || !form.rating || !form.review.trim()) {
      toast.error("Please complete all fields before submitting your review.");
      return;
    }
    if (form.review.trim().length < 20) {
      toast.error("Review must be at least 20 characters.");
      return;
    }
    if (form.review.trim().length > 500) {
      toast.error("Review must be less than 500 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/reviews", {
        name: form.name.trim(),
        service: form.service,
        rating: form.rating,
        review: form.review.trim(),
      });
      setSubmitted(true);
      setForm({ name: "", service: "", rating: 0, review: "" });
      toast.success("Thank you! Your review has been submitted and is awaiting approval.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Unable to submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reviewCount = reviews.length;

  return (
    <section className="pt-20 pb-20 sm:pt-24 sm:pb-24 bg-gradient-to-b from-[#F8FAFC] to-white" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="font-body text-[14px] font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
            CUSTOMER TESTIMONIALS
          </p>
          <h2 className="mt-4 font-heading text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.15] text-[#0F172A]">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-5 max-w-[700px] text-[16px] sm:text-[18px] leading-[1.6] text-slate-600">
            See why homeowners and businesses across Pune trust Royal Cleaning Services for reliable, high-quality cleaning solutions.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr]">
          <div
            className="relative"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.18)] sm:p-6">
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <ReviewSkeleton />
                  <ReviewSkeleton />
                  <ReviewSkeleton />
                </div>
              ) : reviewCount > 0 ? (
                <>
                  <Carousel setApi={setEmblaApi} opts={{ loop: true, align: "start", containScroll: "trimSnaps", dragFree: false, skipSnaps: false }}>
                    <CarouselContent className="gap-4 px-2">
                      {reviews.map((review) => (
                        <CarouselItem key={review.id} className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%]">
                          <ReviewCard review={review} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden xl:block" />
                    <CarouselNext className="hidden xl:block" />
                  </Carousel>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => emblaApi?.scrollPrev()}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                        aria-label="Previous review"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => emblaApi?.scrollNext()}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                        aria-label="Next review"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {reviews.map((_, index) => (
                        <button
                          key={`dot-${index}`}
                          type="button"
                          onClick={() => emblaApi?.scrollTo(index)}
                          className={`rounded-full transition-all duration-300 ${index === selectedIndex ? "h-2.5 w-10 bg-[#F59E0B]" : "h-2.5 w-2.5 bg-slate-200 hover:bg-slate-300"}`}
                          aria-label={`Go to review ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center shadow-[0_20px_50px_-30px_rgba(15,23,42,0.12)]">
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">No Reviews Yet</p>
                  <h3 className="mt-4 text-[26px] font-semibold text-[#0F172A] sm:text-[30px]">Be the first to share your Royal Cleaning experience.</h3>
                  <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.7] text-slate-600">
                    Your review will appear here once it is approved by our team.
                  </p>
                </div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.18)]"
          >
            <div className="mb-7 space-y-3">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Share Your Feedback</p>
              <h3 className="font-heading text-3xl font-bold text-[#0F172A]">Submit a Review</h3>
              <p className="text-sm leading-7 text-slate-600">
                Help future customers choose Royal Cleaning Services by sharing your honest experience. All reviews are reviewed by our admin team before they appear publicly.
              </p>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:bg-white"
                />
              </div>
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Service Used *</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:bg-white"
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Rating *</label>
                  <span className="text-xs text-slate-400">Select 1 to 5 stars</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, rating: value })}
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-3xl border text-lg transition ${value <= form.rating ? "border-amber-300 bg-amber-50 text-amber-600" : "border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:bg-white"}`}
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Review *</label>
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Share your experience in 20–500 characters"
                  rows={6}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] focus:bg-white resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              {submitted && (
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Thank you! Your review has been submitted and is awaiting approval.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
'''

ADMIN_CONTENT = '''import React, { useState, useEffect } from "react";
import { Trash2, Star, Clock, ThumbsUp, ThumbsDown, RotateCcw, MessageSquare } from "lucide-react";
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
        This will permanently delete the review by <strong>{review?.name}</strong>.
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-heading font-bold text-sm text-[#0F172A]">{review.name}</span>
              <span className={`font-body text-[11px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                {cfg.label}
              </span>
              {review.status === "pending" && (
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
              <span>{review.service || "General"}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{dateStr}</span>
            </div>
          </div>
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < (review.rating || 5) ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-200"}`} />
            ))}
          </div>
        </div>

        <p className="font-body text-sm text-[#1E293B] leading-relaxed">{review.review}</p>

        <div className="flex flex-wrap items-center gap-2">
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
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-[#94A3B8] hover:text-red-500 rounded-xl font-body text-xs font-bold transition-all border border-gray-200 hover:border-red-200"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchReviews = async () => {
    try {
      const r = await api.get("/admin/reviews");
      setReviews(r.data);
    } catch {
      toast.error("Unable to load reviews. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleUpdate = async (id, status) => {
    try {
      const endpoint = status === "approved" ? "/admin/reviews/" + id + "/approve" : "/admin/reviews/" + id + "/reject";
      await api.patch(endpoint);
      toast.success(`Review ${status}`);
      setReviews(prev => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/reviews/${deleteTarget.id}`);
      toast.success("Review deleted");
      setReviews(prev => prev.filter((r) => r.id !== deleteTarget.id));
    } catch (err) {
      toast.error(formatApiError(err));
    }
    setDeleteTarget(null);
  };

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const filtered = reviews
    .filter((review) => filter === "all" || review.status === filter)
    .filter((review) => {
      if (!searchTerm.trim()) return true;
      const query = searchTerm.trim().toLowerCase();
      return [review.name, review.service, review.review, review.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortOrder === "oldest" ? aDate - bDate : bDate - aDate;
    });

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
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total", value: counts.all, color: "text-[#2563EB]", bg: "bg-blue-50" },
              { label: "Pending", value: counts.pending, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Approved", value: counts.approved, color: "text-[#10B981]", bg: "bg-green-50" },
              { label: "Rejected", value: counts.rejected, color: "text-red-500", bg: "bg-red-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl px-4 py-3 text-center`}>
                <div className={`font-heading font-extrabold text-2xl ${stat.color}`}>{stat.value}</div>
                <div className="font-body text-xs text-[#1E293B] font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reviews by customer, service, status..."
              className="w-full bg-transparent outline-none text-sm text-[#0F172A] placeholder:text-[#94A3B8]"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-body text-sm text-[#475569]">Sort:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#0F172A] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {TABS.map((tab) => (
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
              {filtered.map((review) => (
                <ReviewCard key={review.id} review={review} onUpdate={handleUpdate} onDelete={setDeleteTarget} />
              ))}
            </AnimatePresence>
          )}
        </div>

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
'''

Path('frontend/src/components/sections/TestimonialsSection.js').write_text(TESTIMONIALS_CONTENT, encoding='utf-8')
Path('frontend/src/pages/admin/AdminReviewsPage.js').write_text(ADMIN_CONTENT, encoding='utf-8')
print('done')
