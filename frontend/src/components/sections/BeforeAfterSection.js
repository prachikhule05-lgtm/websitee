import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BEFORE_AFTER_DATA } from "@/constants/data";
import { ArrowRight } from "lucide-react";

const BeforeAfterSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm font-semibold text-[#F97316] uppercase tracking-widest mb-2">See The Difference</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">Before & After Results</h2>
          <p className="font-body text-base text-slate-400 mt-3 max-w-xl mx-auto">
            Drag the slider to see the transformation. Real results from our cleaning professionals.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {BEFORE_AFTER_DATA.map((item, i) => (
            <button
              key={item.category}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all ${
                active === i
                  ? "bg-[#F97316] text-white shadow-orange"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Slider */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <BeforeAfterSlider
            before={BEFORE_AFTER_DATA[active].before}
            after={BEFORE_AFTER_DATA[active].after}
            label={BEFORE_AFTER_DATA[active].label}
          />
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/gallery"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-white/20 transition-all"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
