import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";

const ContactPage = () => {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <div className="relative pt-32 pb-16 border-b border-gray-100 overflow-hidden bg-[#F8FAF9]">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=85" alt="Clean modern home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-white/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF9] to-transparent" />
          </div>
          <div className="relative z-10 max-w-xl mx-auto px-4 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm font-semibold text-[#0B3B2C] uppercase tracking-widest mb-2">Contact Us</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-extrabold text-[#0F172A] mb-3">Get In Touch</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="font-body text-[#64748B] text-base">We're here to help 7 days a week, 8 AM - 7 PM.</motion.p>
          </div>
        </div>
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
