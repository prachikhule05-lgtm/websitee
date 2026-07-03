import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, PenLine, Check, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
    ))}
  </div>
);

const StarPicker = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform active:scale-90 hover:scale-110"
        >
          <Star className={`w-9 h-9 transition-all duration-100 ${n <= (hover || value) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
        </button>
      ))}
    </div>
  );
};

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const ReviewForm = ({ onSubmitted }) => {
  const [form, setForm] = useState({ customerName: "", service: "", rating: 5, text: "" });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim()) { toast.error("Please enter your name"); return; }
    if (!form.text.trim() || form.text.trim().length < 10) { toast.error("Please write at least 10 characters"); return; }
    setLoading(true);
    try {
      await api.post("/reviews", form);
      onSubmitted();
    } catch {
      toast.error("Could not submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gray-100 max-w-2xl mx-auto"
    >
      <h3 className="font-heading font-bold text-lg text-[#0F172A] mb-5">Share Your Experience</h3>

      {/* Star picker */}
      <div className="mb-5">
        <label className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-widest block mb-2">Your Rating</label>
        <div className="flex items-center gap-3">
          <StarPicker value={form.rating} onChange={v => set("rating", v)} />
          <span className={`font-heading font-bold text-base transition-colors ${form.rating >= 4 ? "text-[#10B981]" : form.rating >= 3 ? "text-[#F59E0B]" : "text-red-400"}`}>
            {STAR_LABELS[form.rating]}
          </span>
        </div>
      </div>

      {/* Name + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-widest block mb-1.5">Your Name *</label>
          <input
            type="text"
            value={form.customerName}
            onChange={e => set("customerName", e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[#0F172A] bg-[#F8FAFC] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
            data-testid="review-name-input"
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-widest block mb-1.5">Service Availed</label>
          <select
            value={form.service}
            onChange={e => set("service", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[#0F172A] bg-[#F8FAFC] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
            data-testid="review-service-select"
          >
            <option value="">Select a service</option>
            {SERVICES_STATIC.map(s => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Review text */}
      <div className="mb-5">
        <label className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-widest block mb-1.5">Your Review *</label>
        <textarea
          value={form.text}
          onChange={e => set("text", e.target.value)}
          rows={3}
          placeholder="Tell us about your experience with our cleaning team..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-[#0F172A] bg-[#F8FAFC] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all resize-none"
          data-testid="review-text-input"
        />
        <div className={`text-right text-xs mt-1 font-body transition-colors ${form.text.length < 10 ? "text-[#94A3B8]" : "text-[#10B981]"}`}>
          {form.text.length} chars {form.text.length >= 10 ? "✓" : `(${10 - form.text.length} more needed)`}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        data-testid="review-submit-btn"
        className="w-full sm:w-auto btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3.5 rounded-full font-body font-bold text-sm transition-all disabled:opacity-60 active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting...</>
        ) : (
          <><PenLine className="w-4 h-4" /> Submit Review</>
        )}
      </button>
    </motion.form>
  );
};

const SuccessCard = ({ onWriteAnother }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center max-w-2xl mx-auto"
  >
    <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
      <Check className="w-8 h-8 text-white" />
    </div>
    <h3 className="font-heading font-bold text-xl text-[#0F172A] mb-2">Thank You!</h3>
    <p className="font-body text-sm text-[#1E293B] mb-4">
      Your review has been submitted and is pending approval. It will appear here once reviewed by our team.
    </p>
    <button
      onClick={onWriteAnother}
      data-testid="write-another-review-btn"
      className="font-body text-sm font-semibold text-[#2563EB] hover:underline"
    >
      Write another review
    </button>
  </motion.div>
);

const STATIC_REVIEWS = [
  { name: "Priya Sharma", service: "Home Deep Cleaning", rating: 5, text: "Outstanding service! The team was punctual, professional, and left my home spotless.",image: null,},
  { name: "Rahul Mehta", service: "Sofa Cleaning", rating: 5, text: "My sofa looks brand new after wet cleaning. Amazing results!",image: null, },
  { name: "Sneha Kulkarni", service: "Kitchen Deep Cleaning", rating: 5, text: "The kitchen cleaning was thorough and they used eco-friendly products.",image: null, },
];

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState(STATIC_REVIEWS);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);
  const pollRef = useRef(null);

  const fetchReviews = () => {
    api.get("/reviews").then(r => {
      if (r.data && r.data.length > 0) {
        setReviews(r.data.map(r2 => ({
          name: r2.customerName, service: r2.service, rating: r2.rating,
          text: r2.text, image: r2.customerImage || "",
        })));
      }
    }).catch(() => {});
  };

  useEffect(() => {
    fetchReviews();
    // Real-time polling — refresh approved reviews every 30s
    pollRef.current = setInterval(fetchReviews, 30000);
    return () => clearInterval(pollRef.current);
  }, []);

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % Math.max(1, reviews.length)), 5000);
    return () => clearInterval(timerRef.current);
  }, [auto, reviews.length]);

  const go = (dir) => {
    setAuto(false);
    setCurrent(c => (c + dir + reviews.length) % reviews.length);
  };

  const handleSubmitted = () => {
    setSubmitted(true);
    setShowForm(false);
    toast.success("Review submitted! Pending admin approval.");
    // Re-fetch after a short delay in case auto-approved
    setTimeout(fetchReviews, 2000);
  };

  const review = reviews[current] || {};

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2">Customer Reviews</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A]">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-body font-bold text-[#0F172A]">4.9/5</span>
            <span className="font-body text-[#1E293B] text-sm">based on 1000+ reviews</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-10">
          <AnimatePresence mode="wait">
           <motion.div
             key={current}
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -30 }}
             transition={{ duration: 0.4 }}
             className="bg-white rounded-3xl p-8 md:p-10 shadow-card border border-gray-100"
            >
             <div className="flex-1">
               <div className="flex items-start justify-between mb-3">
                 <div>
                  <div className="font-heading font-bold text-[#0F172A] text-lg">
                   {review.name}
                  </div>
                  <div className="font-body text-sm text-[#1E293B]">
                   {review.service}
                  </div>
                  {review.location && (
                    <div className="font-body text-xs text-[#94A3B8] mt-0.5">
                      {review.location}, Pune
                    </div>
                 )}
               </div>

               <Quote className="w-8 h-8 text-[#E2E8F0] flex-shrink-0" />
             </div>

             <StarRating rating={review.rating || 5} />

             <p className="font-body text-base text-[#1E293B] mt-3 leading-relaxed italic">
              "{review.text}"
             </p>
           </div>
         </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <button onClick={() => go(-1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all flex items-center justify-center shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAuto(false); setCurrent(i); }}
                    className={`transition-all rounded-full ${i === current ? "w-6 h-2.5 bg-[#2563EB]" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"}`}
                  />
                ))}
              </div>
              <button onClick={() => go(1)} className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all flex items-center justify-center shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Write a review CTA */}
            {!showForm && !submitted && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowForm(true)}
                data-testid="write-review-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white font-body text-sm font-semibold transition-all shadow-md"
              >
                <PenLine className="w-4 h-4" /> Write a Review
              </motion.button>
            )}
            {(showForm || submitted) && (
              <button
                onClick={() => { setShowForm(false); setSubmitted(false); }}
                className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#1E293B] font-body text-sm transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Review form / success */}
        <AnimatePresence>
          {showForm && !submitted && (
            <ReviewForm onSubmitted={handleSubmitted} />
          )}
          {submitted && (
            <SuccessCard onWriteAnother={() => { setSubmitted(false); setShowForm(true); }} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TestimonialsSection;
