import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X, Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Full House Deep Cleaning", "Customized Cleaning Package", "Commercial Post Interior Cleaning Services"];

const HorizontalServiceCard = ({ service, index }) => {
  // Simulating Safsafaiwala's structured highlights array from description if strings match
  const standardIncludes = service.includes || [
    "Deep scrubbing of floors & tiles",
    "Stain, grease & heavy dirt removal",
    "Eco-friendly cleaning agents used"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 max-w-2xl mx-auto w-full"
    >
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Left Aspect Image Container */}
        <div className="flex-shrink-0 relative">
          <img
            src={service.image}
            alt={service.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-50"
          />
        </div>

        {/* Right Info Section */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Title and Rating block stacked closely */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight line-clamp-2">
                {service.name}
              </h3>
              
              {/* Rating and Meta Indicators Row */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-xs font-bold text-gray-700">4.7</span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-[11px] text-blue-600 font-semibold bg-blue-50/70 px-1.5 py-0.5 rounded">
                  {service.duration || "4-8 Hours"}
                </span>
              </div>
            </div>

            {/* Price Segment Alignment */}
            <div className="text-right flex-shrink-0">
              <span className="block text-[8px] tracking-wider text-gray-400 font-bold uppercase leading-none">
                STARTS AT
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 block mt-0.5">
                ₹{service.startingPrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Safsafaiwala Feature: Compact 'Includes' Checklist instead of raw paragraph blocks */}
          <div className="mt-2.5 bg-gray-50/60 rounded-xl p-2 border border-gray-100/50">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">Includes:</p>
            <ul className="space-y-0.5">
              {standardIncludes.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 leading-normal">
                  <Check className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explicit Utility Interactive Actions Bar */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100/70">
            <Link
              to={`/service/${service.slug}`}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View details
            </Link>

            <Link
              to={`/booking?service=${service.slug}`}
              className="px-5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold tracking-wide transition-all duration-150 shadow-sm shadow-amber-500/10 active:scale-95"
            >
              Add +
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState(SERVICES_STATIC);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/services").then(r => {
      if (r.data?.length > 0) setServices(r.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    
    // Looser categorization matching similar to safsafaiwala subheaders
    const matchCat = category === "All" || 
      (s.category && category.toLowerCase().includes(s.category.toLowerCase()));
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col font-sans antialiased">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-12">
        {/* Flat Minimal Subheader & Filter Section */}
        <div className="bg-white border-b border-gray-200/60 sticky top-0 z-10 py-3 shadow-xs">
          <div className="max-w-2xl mx-auto px-4">
            
            {/* Horizontal Filter Navigation Row */}
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

            {/* Integrated Dynamic Inline Search Input bar */}
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
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Service Stack Canvas Wrapper */}
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 mt-4">
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
              />
            ))}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl mt-4 p-6">
              <p className="text-sm font-bold text-gray-700">No services found in this category</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
