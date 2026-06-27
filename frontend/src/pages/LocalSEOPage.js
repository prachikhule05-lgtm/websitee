import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Phone, ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWhatsAppLink, PHONE_URL, PHONE_NUMBER } from "@/utils/whatsapp";

const seoData = {
  "home-deep-cleaning": {
    title: "Home Deep Cleaning in Pune", slug: "home-deep-cleaning",
    h1: "Professional Home Deep Cleaning Service in Pune",
    description: "Book the best home deep cleaning service in Pune. Fully trained professionals, eco-friendly products, and pay after service policy.",
    keywords: "home deep cleaning pune, house cleaning service pune, deep cleaning pune",
    serviceSlug: "home-deep-cleaning",
    price: "Starting from ₹3,499",
    areas: ["Koregaon Park", "Baner", "Kothrud", "Hinjewadi", "Viman Nagar", "Kharadi", "Wakad", "Aundh"],
    features: ["All rooms deep cleaned", "Kitchen & bathroom sanitization", "Furniture dusting", "Floor mopping & vacuum", "Window cleaning"],
  },
  "sofa-cleaning": {
    title: "Sofa Cleaning in Pune", slug: "sofa-cleaning",
    h1: "Professional Sofa & Upholstery Cleaning in Pune",
    description: "Deep shampooing and sofa cleaning service in Pune. Remove stains, odors and allergens. Pay after service.",
    keywords: "sofa cleaning pune, sofa shampooing pune, upholstery cleaning pune",
    serviceSlug: "sofa-cleaning",
    price: "Starting from ₹499/seat",
    areas: ["Koregaon Park", "Baner", "Viman Nagar", "Kharadi", "Hadapsar", "Camp"],
    features: ["Hot water extraction", "Stain removal", "Odor elimination", "Quick dry", "Fabric protection"],
  },
  "kitchen-cleaning": {
    title: "Kitchen Cleaning in Pune", slug: "kitchen-cleaning",
    h1: "Professional Kitchen Deep Cleaning Service in Pune",
    description: "Complete kitchen deep cleaning in Pune. Chimney, tiles, cabinets, appliances — everything sparkling clean. Pay after service.",
    keywords: "kitchen cleaning pune, kitchen deep cleaning pune, chimney cleaning pune",
    serviceSlug: "kitchen-cleaning",
    price: "Starting from ₹1,499",
    areas: ["Baner", "Koregaon Park", "Hadapsar", "Kothrud", "Viman Nagar"],
    features: ["Chimney/hob cleaning", "Tile & grout cleaning", "Cabinet cleaning", "Grease removal", "Appliance cleaning"],
  },
  "bathroom-cleaning": {
    title: "Bathroom Cleaning in Pune", slug: "bathroom-cleaning",
    h1: "Professional Bathroom Deep Cleaning Service in Pune",
    description: "Complete bathroom sanitization and deep cleaning in Pune. Limescale removal, tile cleaning, fixture polishing.",
    keywords: "bathroom cleaning pune, bathroom deep cleaning pune, bathroom sanitization pune",
    serviceSlug: "bathroom-cleaning",
    price: "Starting from ₹499/bathroom",
    areas: ["Koregaon Park", "Aundh", "Baner", "Wakad", "Viman Nagar", "Kharadi"],
    features: ["Tile & grout cleaning", "Toilet sanitization", "Limescale removal", "Floor scrubbing", "Fixture polishing"],
  },
  "office-cleaning": {
    title: "Office Cleaning in Pune", slug: "office-cleaning",
    h1: "Professional Office Cleaning Service in Pune",
    description: "Regular and deep office cleaning in Pune for a clean, productive workspace. Trained professionals, flexible scheduling.",
    keywords: "office cleaning pune, commercial cleaning pune, office deep cleaning pune",
    serviceSlug: "office-cleaning",
    price: "Starting from ₹2,999",
    areas: ["Hinjewadi", "Baner", "Kharadi", "Viman Nagar", "Wakad", "Magarpatta"],
    features: ["Workstation cleaning", "Meeting room cleaning", "Common area", "Restroom sanitization", "Floor mopping"],
  },
  "commercial-cleaning": {
    title: "Commercial Cleaning in Pune", slug: "commercial-cleaning",
    h1: "Professional Commercial Cleaning Services in Pune",
    description: "Industrial-grade commercial cleaning for restaurants, hotels, warehouses, and shops in Pune. Custom quotes available.",
    keywords: "commercial cleaning pune, industrial cleaning pune, restaurant cleaning pune",
    serviceSlug: "commercial-cleaning",
    price: "Custom Quote",
    areas: ["Hinjewadi", "Kharadi", "Magarpatta", "NIBM Road", "Talegaon", "Chinchwad"],
    features: ["Customized cleaning plan", "Industrial-grade equipment", "Flexible scheduling", "Free site inspection"],
  },
};

const LocalSEOPage = ({ service }) => {
  const data = seoData[service];
  if (!data) return <div>Page not found</div>;

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
              <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="font-body text-sm text-white/80">Pune, Maharashtra</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              {data.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="font-body text-slate-300 text-base mb-6 max-w-2xl">
              {data.description}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/booking?service=${data.serviceSlug}`} className="btn-orange-glow bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3.5 rounded-full font-body font-bold text-sm inline-flex items-center gap-2 transition-all">
                Book Now — {data.price} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={PHONE_URL} className="bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-full font-body font-semibold text-sm inline-flex items-center gap-2 hover:bg-white/20 transition-all">
                <Phone className="w-4 h-4" /> {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          {/* What's included */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-6">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.features.map(f => (
                <div key={f} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-7 h-7 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <span className="font-body text-sm font-medium text-[#0F172A]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-6">Areas We Serve in Pune</h2>
            <div className="flex flex-wrap gap-3">
              {data.areas.map(area => (
                <div key={area} className="flex items-center gap-1.5 bg-blue-50 text-[#2563EB] px-4 py-2 rounded-full font-body text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5" /> {area}
                </div>
              ))}
              <div className="flex items-center gap-1.5 bg-gray-100 text-[#475569] px-4 py-2 rounded-full font-body text-sm">+ All Pune areas</div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 text-center">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Book {data.title} Today</h3>
            <p className="font-body text-slate-300 text-sm mb-5">Pay only after the service is completed. No advance required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={`/booking?service=${data.serviceSlug}`}
                className="btn-orange-glow bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-full font-body font-bold text-sm inline-flex items-center gap-2 transition-all justify-center">
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={getWhatsAppLink(`I need ${data.title}`)} target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-full font-body font-bold text-sm inline-flex items-center gap-2 transition-all justify-center">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LocalSEOPage;
