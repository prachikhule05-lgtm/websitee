import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Sparkles, Coffee } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <Smartphone className="w-7 h-7" />,
    title: "Book Online",
    description: "Choose your service, pick a date and time that works for you. Fill your details in under 60 seconds.",
    color: "from-[#2563EB] to-[#1D4ED8]",
    highlight: "bg-blue-50 text-[#2563EB]"
  },
  {
    step: "02",
    icon: <Sparkles className="w-7 h-7" />,
    title: "We Clean & Shine",
    description: "Our verified professionals arrive on time with all equipment and eco-friendly products. Sit back and relax.",
    color: "from-[#F59E0B] to-[#D97706]",
    highlight: "bg-amber-50 text-[#F59E0B]"
  },
  {
    step: "03",
    icon: <Coffee className="w-7 h-7" />,
    title: "Pay After Service",
    description: "Inspect the cleaning. Fully satisfied? Then pay. No advance required, no hassle, no risk.",
    color: "from-[#10B981] to-[#059669]",
    highlight: "bg-green-50 text-[#10B981]"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A]">How It Works</h2>
          <p className="font-body text-base text-[#1E293B] mt-3 max-w-xl mx-auto">
            Book in 60 seconds. Our team handles the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-[#2563EB] via-[#F59E0B] to-[#10B981] opacity-30 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover transition-all text-center group card-hover relative z-10"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${step.highlight} mb-3 font-body uppercase tracking-wide`}>
                Step {step.step}
              </div>
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
              <p className="font-body text-sm text-[#1E293B] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-3xl p-6 md:p-8 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-white font-heading text-lg font-bold">
              No Advance Payment. No Risk. 100% Satisfaction Guaranteed.
            </div>
            <div className="bg-[#F59E0B] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide whitespace-nowrap">
              Pay After Service
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
