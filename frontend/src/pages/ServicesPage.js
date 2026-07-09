import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Residential", "Commercial"];

const HorizontalServiceCard = ({ service, index }) => {
  const category =
    service.category?.charAt(0).toUpperCase() +
    service.category?.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-2xl mx-auto w-full"
    >
      {/* Main Container: Image on Left, All Content on Right */}
      <div className="flex p-4 gap-4 sm:gap-5">
        
        {/* Left Side: Fixed Image sizing to prevent pulling space */}
        <div className="flex-shrink-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover"
          />
        </div>

        {/* Right Side: content takes full remaining width */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Top Header: Title & Price Side-by-Side */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate">
                {service.name}...
              </h3>
              <div className="text-right flex-shrink-0">
                <span className="block text-[9px] uppercase font-bold tracking-wider text-gray-400 leading-none">
                  FROM
                </span>
                <span className="text-lg sm:text-xl font-black text-blue-600 tracking-tight block mt-0.5">
                  ₹{service.startingPrice?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Badges & Meta Row: Kept tight on a single row */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wide">
                {category}
              </span>
              <div className="flex items-center text-xs text-gray-500 font-medium">
                <span className="text-amber-400 mr-0.5">★</span>
                <span>4.9</span>
              </div>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-xs text-gray-500 font-medium">
                {service.duration || "4-8 Hours"}
              </span>
            </div>

            {/* Description: Spans across under the header block to eliminate dead white space */}
            <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Actions Row: Flat layout positioned cleanly at the baseline */}
          <div className="flex items-center justify-between mt-3 pt-1 border-t border-gray-50">
            <Link
              to={`/service/${service.slug}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View Details
            </Link>

            <Link
              to={`/booking?service=${service.slug}`}
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold tracking-wide transition-all duration-200 transform active:scale-95 shadow-sm"
            >
              Book Now
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
    const matchCat = category === "All" || s.category === category.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-12">
        {/* Modern Minimalist Header Section */}
        <div className="bg-white border-b border-gray-100 pt-8 pb-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">
              What We Offer
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
              Our Cleaning Services
            </h1>

            {/* Clean Input Search Controls */}
            <div className="max-w-md mx-auto relative mt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                data-testid={SERVICES.searchInput}
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Navbar and Items Panel */}
        <div className="w-full max-w-2xl mx-auto px-4 py-4">
          {/* Category Chips container styling */}
          <div className="flex flex-nowrap overflow-x-auto gap-2 mb-4 pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Metric counter indicators */}
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {loading ? "Loading..." : `${filtered.length} services found`}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>Sorted by:</span>
              <span className="font-bold text-gray-700">Most Popular</span>
            </div>
          </div>

          {/* Cards Vertical Stack Wrapper */}
          <div className="flex flex-col gap-4">
            {filtered.map((service, i) => (
              <HorizontalServiceCard
                key={service.id || service.slug}
                service={service}
                index={i}
              />
            ))}
          </div>

          {/* Empty fallback screen standard layout state */}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-8">
              <p className="text-base font-bold text-gray-800 mb-1">No services found</p>
              <p className="text-xs text-gray-400 mb-4">Try cleaning up your filters or search keywords</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-blue-700 transition-all"
              >
                Reset Search Filters
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
