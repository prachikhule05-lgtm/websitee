import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X, Check, AlertTriangle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Full House Deep Cleaning", "Customized Cleaning Package", "Commercial Post Interior Cleaning Services"];

{/* --- Dynamic Ultra-Compact Bottom Sheet Modal --- */}
const DetailsModal = ({ service, onClose }) => {
  if (!service) return null;

  // Dynamically reads the specific arrays belonging to this service
  const includesList = service.includes && service.includes.length > 0 
    ? service.includes 
    : [
        "Standard Deep scrubbing of target zones",
        "Stain, grease & localized dirt removal",
        "Eco-friendly cleaning agents application"
      ];

  const excludesList = service.excludes && service.excludes.length > 0 
    ? service.excludes 
    : [
        "Cleaning of internal closed storage units",
        "High-rise exterior glass operations"
      ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs px-2 sm:px-0">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Compact Sheet Container */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 240 }}
          className="relative bg-white w-full max-w-md rounded-t-2xl max-h-[70vh] shadow-2xl flex flex-col z-10 overflow-hidden mb-16 md:mb-0"
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-20">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight truncate pr-4">
              {service.name} Info
            </h2>
            <button 
              onClick={onClose} 
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Data Body */}
          <div className="p-4 space-y-4 pb-20 overflow-y-auto custom-scrollbar">
            {/* Metadata Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600 bg-gray-50 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-amber-500 text-sm">★</span>
                <span>{service.rating || "4.7"} Rating</span>
              </div>
              <div className="border-l border-gray-200 flex items-center justify-center">
                {service.duration || "2 Hours"} Duration
              </div>
            </div>

            {/* Dynamic Service Specific Includes */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Includes
              </h4>
              <ul className="space-y-1.5 pl-0.5">
                {includesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Service Specific Excludes */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1.5 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> Excludes
              </h4>
              <ul className="space-y-1.5 pl-0.5">
                {excludesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer Security Warning Block */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5">
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Disclaimer
              </p>
              <p className="text-[11px] text-amber-700 leading-normal font-medium">
                Please ensure valuables are securely stored. The team is not responsible for unsupervised items.
              </p>
            </div>
          </div>

          {/* Sticky Book / Close CTA Footer Action */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-20">
            <Link
              to={`/booking?service=${service.slug}`}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-center block text-xs tracking-wide shadow-xs transition-all active:scale-[0.99]"
            >
              Add Package — ₹{service.startingPrice?.toLocaleString("en-IN")}
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

{/* --- Main Service Flex Card Row --- */}
const HorizontalServiceCard = ({ service, index, onOpenDetails }) => {
  const standardIncludes = service.includes && service.includes.length > 0
    ? service.includes
    : [
        "Deep scrubbing of floors & tiles",
        "Stain, grease & heavy dirt removal",
        "Eco-friendly cleaning agents used"
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 max-w-2xl mx-auto w-full"
    >
      {/* Top Flex Info block */}
      <div className="flex gap-4 items-center">
        <div className="flex-shrink-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-20 h-20 rounded-xl object-cover border border-gray-50"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                {service.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-xs font-bold text-gray-700">{service.rating || "4.7"}</span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-[11px] text-blue-600 font-semibold bg-blue-50/70 px-1.5 py-0.5 rounded">
                  {service.duration || "4-8 Hours"}
                </span>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="block text-[8px] tracking-wider text-gray-400 font-bold uppercase leading-none">
                STARTS AT
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5 whitespace-nowrap">
                ₹{service.startingPrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wide Includes Block beneath the top row to maximize text width without truncation */}
      <div className="mt-3 bg-gray-50/80 rounded-xl p-3 border border-gray-100/50">
        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">Includes:</p>
        <ul className="space-y-1">
          {standardIncludes.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-normal">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button Tray Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={() => onOpenDetails(service)}
          className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
        >
          View details
        </button>

        <Link
          to={`/booking?service=${service.slug}`}
          className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold tracking-wide transition-all duration-150 shadow-sm active:scale-95"
        >
          Add +
        </Link>
      </div>
    </motion.div>
  );
};

{/* --- Complete Master Layout Wrapper --- */}
const ServicesPage = () => {
  const [services, setServices] = useState(SERVICES_STATIC);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);

  useEffect(() => {
    api.get("/services").then(r => {
      if (r.data?.length > 0) setServices(r.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || (s.category && category.toLowerCase().includes(s.category.toLowerCase()));
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col font-sans antialiased">
      {/* Absolute base stacking context container */}
      <div className="relative z-30 bg-white">
        <Header />
      </div>
      
      <main className="flex-1 pb-24">
        {/* Sticky Fixed Filter Control Grid with precise offset settings */}
        <div className="bg-white border-b border-gray-200/60 sticky top-[60px] md:top-[70px] z-20 py-3 shadow-sm">
          <div className="max-w-2xl mx-auto px-4">
            
            {/* Sliding Categories Navigation */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-4 px-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    category === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat === "All" ? "All Services" : cat}
                </button>
              ))}
            </div>

            {/* Input Filter Bar */}
            <div className="relative mt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                data-testid={SERVICES.searchInput}
                type="text"
                placeholder="Search for a service..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-200 rounded-xl pl-10 pr-9 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Master Output Stack Grid */}
        <div className="w-full max-w-2xl mx-auto px-3 mt-4">
          <div className="mb-3 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {category === "All" ? "Top Booking Packages" : category}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((service, i) => (
              <HorizontalServiceCard
                key={service.id || service.slug}
                service={service}
                index={i}
                onOpenDetails={(srv) => setSelectedServiceDetails(srv)}
              />
            ))}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl mt-4 p-6">
              <p className="text-sm font-bold text-gray-700">No services found</p>
            </div>
          )}
        </div>
      </main>

      {/* Interactive Floating Bottom Sheet Trigger Activation */}
      {selectedServiceDetails && (
        <DetailsModal 
          service={selectedServiceDetails} 
          onClose={() => setSelectedServiceDetails(null)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default ServicesPage;
