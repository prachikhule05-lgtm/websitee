import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustedClientsSection from "@/components/sections/TrustedClientsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";


const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (!scrollTo) return;
    const target = document.getElementById(scrollTo);
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <ServicesOverview />
        <TestimonialsSection />
<<<<<<< HEAD
=======
        <TrustedClientsSection />
        <FAQSection />
>>>>>>> 5aac131438dcb9e3c80f3cb3e0c18c69727b6ce6
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
