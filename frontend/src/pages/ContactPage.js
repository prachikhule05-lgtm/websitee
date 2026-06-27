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
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2">Contact Us</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-extrabold text-white mb-3">Get In Touch</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="font-body text-slate-300 text-base">We're here to help 7 days a week, 8 AM - 7 PM.</motion.p>
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
