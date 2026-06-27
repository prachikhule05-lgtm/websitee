import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BEFORE_AFTER_DATA } from "@/constants/data";

const categories = ["All", "Home", "Kitchen", "Sofa", "Bathroom", "Office"];

const GalleryPage = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? BEFORE_AFTER_DATA : BEFORE_AFTER_DATA.filter(d => d.category === active);

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm font-semibold text-[#F97316] uppercase tracking-widest mb-2">
              Our Results
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Before & After Gallery
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="font-body text-slate-300 text-base max-w-xl mx-auto">
              Drag the slider to see the remarkable transformation our team delivers.
            </motion.p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all border ${
                  active === cat
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-blue"
                    : "bg-white text-[#475569] border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.category}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <BeforeAfterSlider before={item.before} after={item.after} label={item.label} />
                <div className="mt-3 text-center">
                  <span className="font-heading font-bold text-sm text-[#0F172A]">{item.category} Cleaning</span>
                  <span className="font-body text-xs text-[#94A3B8] ml-2">• Drag to compare</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">Ready for the Same Results?</h2>
            <p className="font-body text-slate-300 text-base mb-6 max-w-lg mx-auto">
              Book our professional cleaning service today and see the transformation for yourself.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 btn-orange-glow bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-body font-bold text-base transition-all"
            >
              Book Now — Pay After Service
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GalleryPage;
