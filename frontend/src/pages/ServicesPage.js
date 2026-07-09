import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X, Check, AlertTriangle, Info, Star, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Full House Deep Cleaning", "Customized Cleaning Package", "Commercial Post Interior Cleaning Services"];

{/* --- Premium Details Bottom Sheet Modal Component --- */}
const DetailsModal = ({ service, onClose }) => {
  if (!service) return null;

  // Mocked details to simulate high-fidelity data structure
  const includesList = service.includes || [
    "Dry dusting of TV unit and exterior cleaning of surfaces only",
    "Manual floor scrubbing, sanitization & specialized deep mopping",
    "Deep wiping of all switchboards, doors, and interior handle fixtures"
  ];

  const excludesList = service.excludes || [
    "Cleaning of inside kitchen storage cabinets & bathroom windows",
    "Exterior high-rise glass beyond safe immediate physical reach"
  ];

  const reviews = [
    { name: "Renu Chetan", date: "July 7, 2026", rating: 4, comment: "Good service, team was on time." },
    { name: "Shruti Akshay", date: "June 21, 2026", rating: 5, comment: "Service was very good and detailed." }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
        {/* Backdrop dismiss click zone */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col z-10"
        >
          {/* Header Controls sticky block */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-20">
            <h2 className="font-bold text-gray-900 text-base truncate pr-4">
              {service.name} Details
            </h2>
            <button 
              onClick={onClose} 
              className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Core Descriptive Content Pane */}
          <div className="p-5 space-y-6 pb-28 overflow-y-auto">
            {/* Context Thumbnail Banner if applicable */}
            {service.image && (
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-44 object-cover rounded-2xl border border-gray-100" 
              />
            )}

            {/* Quick Header Stats Block */}
            <div className="flex items-center gap-4 text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>4.8 Stars</span>
              </div>
              <span className="text-gray-300">|</span>
              <div>{service.duration || "2 Hours"} Duration</div>
            </div>

            {/* Dynamic Includes Matrix Segment */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Includes
              </h4>
              <ul className="space-y-2 pl-1">
                {includesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dynamic Excludes Matrix Segment */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-500" /> Excludes
              </h4>
              <ul className="space-y-2 pl-1">
                {excludesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standard Legal Safeguard Disclaimer Column */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3.5">
              <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Disclaimer
              </h5>
              <p className="text-[11px] text-amber-700 leading-normal">
                Please guarantee that heavy or highly valuable ornaments are securely stored away. Our personnel cannot take administrative liabilities for loose items left unsupervised.
              </p>
            </div>

            {/* Social Proof Review Section */}
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                Customer Reviews
              </h4>
              <div className="space-y-4">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="text-xs border-b border-gray-50 pb-3 last:border-none">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-800">{rev.name}</span>
                      <span className="text-gray-400 text-[10px]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 mb-1">
                      {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Call footer ribbon overlay element */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-20">
            <Link
              to={`/booking?service=${service.slug}`}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-center block text-sm shadow-md transition-all active:scale-[0.99]"
            >
              Continue with package — ₹{service.startingPrice?.toLocaleString("en-IN")}
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const HorizontalServiceCard = ({ service, index, onOpenDetails }) => {
  const standardIncludes = service.includes || [
    "Deep scrubbing of floors & tiles",
    "Stain, grease & heavy dirt removal",
    "Eco-friendly cleaning agents used"
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 max-w-2xl mx-auto w-full">
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
                <span className="text-xs font-bold text-gray-700">4.7</span>
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

      {/* Primary Actions Row */}
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
    </div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState(SERVICES_STATIC);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  
  {/* Modal State hook managers */}
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);

  useEffect(() => {
    api.get("/services").then(r => {
      if (r.data?.length > 0) setServices(r.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || (s.category && category.toLowerCase().includes(s.category.toLowerCase()));
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col font-sans antialiased">
      <div className="relative z-30 bg-white">
        <Header />
      </div>
      
      <main className="flex-1 pb-24">
        <div className="bg-white border-b border-gray-200/60 sticky top-[60px] md:top-[70px] z-20 py-3 shadow-sm">
          <div className="max-w-2xl mx-auto px-4">
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
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto px-3 mt-4">
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
        </div>
      </main>

      {/* Rendering the sheet dynamic overlay block at viewport scale */}
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
