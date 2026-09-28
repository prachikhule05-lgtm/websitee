import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Leaf, Award } from "lucide-react";

const stats = [
  { icon: <Users className="w-6 h-6" />, value: 1000, suffix: "+", label: "Happy Customers", color: "text-[#166534]", bg: "bg-green-50" },
  { icon: <Star className="w-6 h-6" />, value: 4.9, suffix: "/5", label: "Average Rating", color: "text-[#166534]", bg: "bg-green-50", decimals: 1 },
  { icon: <Leaf className="w-6 h-6" />, value: 100, suffix: "%", label: "Eco-Friendly Products", color: "text-[#22c55e]", bg: "bg-green-50" },
  { icon: <Award className="w-6 h-6" />, value: 5, suffix: "+", label: "Years of Experience", color: "text-[#166534]", bg: "bg-green-50" },
];

const AnimatedNumber = ({ value, suffix, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(decimals)));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="font-body text-[15px] font-semibold uppercase tracking-[0.18em] text-[#166534] mb-3">
            OUR NUMBERS
          </p>
          <h2 className="mx-auto max-w-[700px] font-heading text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.15] text-[#0F172A]">
            Trusted by Pune's Homeowners
          </h2>
          <p className="mx-auto mt-4 max-w-[650px] text-[18px] leading-[1.6] text-slate-600">
            We deliver premium cleaning services across Pune with proven experience, fast response, and trusted professionals for homes, offices, and commercial spaces.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group mx-auto flex h-[160px] w-full max-w-[220px] flex-col items-center justify-center gap-4 rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.18)] p-5 text-center transition-all hover:-translate-y-1.5"
            >
              <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-2xl ${stat.bg}`}>
                <div className={`text-[22px] ${stat.color}`}>{stat.icon}</div>
              </div>
              <div className={`font-heading text-[32px] md:text-[38px] xl:text-[44px] font-extrabold ${stat.color}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>
              <div className="font-heading text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
