import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <StatsSection />
        <ServicesOverview />
        <HowItWorks />
        <BeforeAfterSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
