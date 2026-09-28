import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, CheckCircle, Phone, ArrowRight, Clock, Shield, Instagram } from "lucide-react";
import { PHONE_URL, getWhatsAppLink, INSTAGRAM_URL, JUSTDIAL_URL } from "@/utils/whatsapp";
import { HERO } from "@/constants/testIds";

const trustBadges = [
  { icon: "⭐", label: "4.9 Rating", sub: "1000+ Reviews" },
  { icon: "👥", label: "1000+ Happy Customers", sub: "Pune & Nearby" },
  { icon: "⚡", label: "Same Day Service", sub: "Subject to availability" },
  { icon: "✅", label: "Verified Professionals", sub: "Background checked" },
];

const HeroSection = () => {
  return (
    <section
      data-testid={HERO.section}
      className="relative min-h-[70vh] overflow-hidden bg-[#F8FAFC]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=85"
          alt="Clean modern home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-slate-800 shadow-sm backdrop-blur-md mb-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <span className="font-body text-[13px] sm:text-[14px] font-semibold tracking-wide">
                Pune's Most Trusted Cleaning Service
              </span>
            </motion.div>

            <motion.h1
              data-testid={HERO.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-[32px] sm:text-[40px] md:text-[50px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A] max-w-[600px] mb-5"
            >
              Premium Cleaning.
              <br />
              <span className="text-[#0B2545]">
                Royal Treatment.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[16px] sm:text-[18px] leading-[1.5] text-slate-600 max-w-[500px] mb-8"
            >
              Top-rated professionals. Eco-friendly products. <span className="text-[#F59E0B] font-bold">Spotless</span> results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <Link
                to="/booking"
                data-testid={HERO.bookNowBtn}
                className="group inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-[#0B2545] px-6 sm:px-8 text-[15px] sm:text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[#134074] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={HERO.whatsappBtn}
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-white px-6 sm:px-8 text-[15px] sm:text-[16px] font-semibold text-slate-800 shadow-md transition-all duration-300 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              >
                <svg className="mr-2 w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 sm:gap-10"
            >
              {trustBadges.slice(0,3).map((badge, i) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#166534] shadow-sm border border-slate-100">
                    <span className="text-[18px]">{badge.icon}</span>
                  </div>
                  <div className="hidden sm:block font-heading text-[15px] font-medium text-slate-700">
                    {badge.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="hidden xl:flex justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[540px] rounded-[32px] border border-white/15 bg-white/10 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.45)]"
            >
              <img
                src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1200&q=80"
                alt="Modern home cleaning scene"
                className="h-[520px] w-full rounded-[32px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-[#0F172A]/30 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
          <div className="w-1.5 h-3 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
