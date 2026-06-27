import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Star, Leaf, Award } from "lucide-react";

const stats = [
  { icon: <Users className="w-6 h-6" />, value: 1000, suffix: "+", label: "Happy Customers", color: "text-[#2563EB]", bg: "bg-blue-50" },
  { icon: <Star className="w-6 h-6" />, value: 4.9, suffix: "/5", label: "Average Rating", color: "text-[#F97316]", bg: "bg-orange-50", decimals: 1 },
  { icon: <Leaf className="w-6 h-6" />, value: 100, suffix: "%", label: "Eco-Friendly Products", color: "text-[#22C55E]", bg: "bg-green-50" },
  { icon: <Award className="w-6 h-6" />, value: 5, suffix: "+", label: "Years of Experience", color: "text-[#2563EB]", bg: "bg-blue-50" },
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm font-semibold text-[#F97316] uppercase tracking-widest mb-2">Our Numbers</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A]">Trusted by Pune's Homeowners</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all text-center group card-hover"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <div className={`font-heading text-3xl sm:text-4xl font-extrabold ${stat.color} mb-1`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>
              <div className="font-body text-sm text-[#475569] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
