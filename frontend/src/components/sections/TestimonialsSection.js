import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import api from "@/utils/api";
import { TESTIMONIALS_STATIC } from "@/constants/data";

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState(TESTIMONIALS_STATIC);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    api.get("/reviews").then(r => {
      if (r.data && r.data.length > 0) {
        setReviews(r.data.map(r2 => ({
          name: r2.customerName, service: r2.service, rating: r2.rating,
          text: r2.text, image: r2.customerImage || ""
        })));
      }
    }).catch(() => { });
  }, []);

  // autoplay
  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [auto, reviews.length]);

  const go = (dir) => {
    setAuto(false);
    setCurrent(c => (c + dir + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-card border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm">
                    {reviews[current]?.image ? (
                      <img src={reviews[current].image} alt={reviews[current].name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#F59E0B] flex items-center justify-center text-white font-bold text-xl">
                        {reviews[current]?.name?.[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-heading font-bold text-[#0F172A] text-lg">{reviews[current]?.name}</div>
                      <div className="font-body text-sm text-[#1E293B]">{reviews[current]?.service}</div>
                      {reviews[current]?.location && <div className="font-body text-xs text-[#94A3B8] mt-0.5">{reviews[current].location}, Pune</div>}
                    </div>
                    <Quote className="w-8 h-8 text-[#E2E8F0] flex-shrink-0" />
                  </div>
                  <StarRating rating={reviews[current]?.rating || 5} />
                  <p className="font-body text-base text-[#1E293B] mt-3 leading-relaxed italic">
                    "{reviews[current]?.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
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
          <div className="rounded-[20px] border border-slate-200 bg-[#0F172A] p-6 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.18)]">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-[#FBBF24]">Share your review</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Send feedback</h3>
            <p className="mt-2 text-sm text-slate-300">Submit your review and our team will publish it once it&#39;s approved.</p>
            <ReviewForm setReviews={setReviews} />
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
