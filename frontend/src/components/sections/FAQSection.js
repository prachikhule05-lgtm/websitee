import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_DATA } from "@/constants/data";

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2">Got Questions?</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A]">Frequently Asked Questions</h2>
          <p className="font-body text-base text-[#1E293B] mt-3">Everything you need to know about our cleaning services.</p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all ${open === i ? "border-[#2563EB] shadow-blue/10 shadow-lg" : "border-gray-100 shadow-sm"}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? "bg-[#2563EB] text-white" : "bg-blue-50 text-[#2563EB]"}`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className={`font-heading font-semibold text-sm sm:text-base ${open === i ? "text-[#2563EB]" : "text-[#0F172A]"}`}>
                    {item.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-5 h-5 flex-shrink-0 ${open === i ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pl-16">
                      <p className="font-body text-sm text-[#1E293B] leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
