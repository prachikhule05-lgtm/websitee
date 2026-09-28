import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import api, { formatApiError } from "@/utils/api";
import { TESTIMONIALS_STATIC } from "@/constants/data";
import { toast } from "sonner";

const formatDate = (d) => {
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return null;
  }
};

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`} />
    ))}
  </div>
);

const ReviewForm = ({ setReviews }) => {
  const [form, setForm] = useState({ name: "", service: "", rating: 5, review: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.service.trim()) e.service = "Please enter the service.";
    if (!form.review.trim() || form.review.trim().length < 20) e.review = "Please write at least 20 characters.";
    if (!form.rating || form.rating < 1) e.rating = "Please select a rating.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      await api.post("/reviews", { name: form.name.trim(), service: form.service.trim(), rating: form.rating, review: form.review.trim() });
      toast.success("Thanks! Your review is submitted for approval.");
      setForm({ name: "", service: "", rating: 5, review: "" });
      setErrors({});
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Name</label>
        <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-white" />
        {errors.name && <div className="mt-1 text-xs text-red-300">{errors.name}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Service</label>
        <input value={form.service} onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-white" />
        {errors.service && <div className="mt-1 text-xs text-red-300">{errors.service}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Rating</label>
        <div className="mt-2 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setForm((p) => ({ ...p, rating: n }))} className={n <= form.rating ? "text-yellow-400" : "text-slate-200"}><Star className="w-5 h-5" /></button>
          ))}
        </div>
        {errors.rating && <div className="mt-1 text-xs text-red-300">{errors.rating}</div>}
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-200">Review</label>
        <textarea value={form.review} onChange={(e) => setForm((p) => ({ ...p, review: e.target.value }))} rows={4} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-white" />
        {errors.review && <div className="mt-1 text-xs text-red-300">{errors.review}</div>}
      </div>
      <button type="submit" disabled={submitting} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#166534] px-4 py-3 text-sm font-semibold text-[#0F172A]">{submitting ? "Submitting..." : "Submit review"}</button>
    </form>
  );
};

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState(TESTIMONIALS_STATIC);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });
  const [autoPlay, setAutoPlay] = useState(true);
  const autoRef = useRef(null);

  useEffect(() => {
    api
      .get("/reviews")
      .then((response) => {
        const items = (response.data || [])
          .filter((r) => r.status === "approved")
          .map((r) => ({ name: r.name, service: r.service, rating: r.rating || 5, review: r.review, date: formatDate(r.createdAt) }));
        if (items.length) setReviews(items);
      })
      .catch(() => {});
  }, []);

  // autoplay
  useEffect(() => {
    if (!emblaApi) return;
    if (autoPlay) {
      autoRef.current = setInterval(() => emblaApi.scrollNext(), 5000);
    }
    return () => clearInterval(autoRef.current);
  }, [emblaApi, autoPlay]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="pt-20 pb-20 sm:pt-24 sm:pb-24 bg-gradient-to-b from-[#F8FAFC] to-white" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="font-body text-[14px] font-semibold uppercase tracking-[0.18em] text-[#166534]">CUSTOMER TESTIMONIALS</p>
          <h2 className="mt-4 font-heading text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.15] text-[#0F172A]">What Our Customers Say</h2>
          <p className="mx-auto mt-5 max-w-[700px] text-[16px] sm:text-[18px] leading-[1.6] text-slate-600">Thousands of homeowners and businesses across Pune trust Royal Cleaning Services for reliable, professional, and high-quality cleaning. Here's what our customers say about us.</p>
        </motion.div>

        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.08)]">
          {reviews.length === 0 ? (
            <div className="py-12 text-center text-slate-500">No reviews available yet.</div>
          ) : (
            <div onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
              <div className="embla" ref={emblaRef}>
                <div className="flex">
                  {reviews.map((r, i) => (
                    <div key={i} className="embla__slide px-3 w-full sm:w-1/2 lg:w-1/3 flex-shrink-0">
                      <div className="rounded-[20px] border border-slate-200 bg-white p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-[#0F172A]">{r.name}</h3>
                              {r.service && <span className="mt-2 inline-block rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#92400E]">{r.service}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <StarRating rating={r.rating || 5} />
                            </div>
                          </div>
                          <p className="text-[15px] leading-[1.7] text-slate-700">{r.review}</p>
                        </div>
                        {r.date && <div className="mt-4 text-sm text-slate-500">Reviewed on {r.date}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-3">
                  <button onClick={scrollPrev} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow transition hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={scrollNext} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow transition hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
                </div>
                <div className="flex gap-2">
                  {reviews.map((_, idx) => (
                    <button key={idx} onClick={() => emblaApi && emblaApi.scrollTo(idx)} className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-10 xl:grid-cols-[1fr_420px]">
          <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.08)]">
            <h3 className="text-2xl font-semibold text-[#0F172A] mb-4">Our Popular Services & Pricing</h3>
            <p className="text-slate-600 mb-6">Transparent pricing for your convenience. You can edit these later in the admin dashboard.</p>
            <div className="space-y-4">
              {[
                { name: "Deep Home Cleaning", price: "₹2,999" },
                { name: "Sofa Cleaning", price: "₹499/seat" },
                { name: "Kitchen Deep Cleaning", price: "₹1,499" },
                { name: "Bathroom Cleaning", price: "₹499" },
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-slate-800">{service.name}</span>
                  <span className="font-semibold text-[#166534]">{service.price}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-full bg-[#0F172A] py-3 font-semibold text-white transition hover:bg-[#1E293B]">
              View All Services
            </button>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-[#0F172A] p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.18)]">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-[#FBBF24]">Share your review</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Send feedback</h3>
            <p className="mt-2 text-sm text-slate-300">Submit your review and our team will publish it once it&#39;s approved.</p>
            <ReviewForm setReviews={setReviews} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
