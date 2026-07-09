import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";

// Restored clean, standard categories
const categories = ["All", "Residential", "Commercial"];

const INITIAL_SERVICES = [
  {
    id: "1",
    name: "Home Deep Cleaning",
    category: "residential",
    price: "3499",
    duration: "4-8 Hours",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    description: "Complete deep cleaning for your entire home. Our expert team ensures every corner sparkles.",
    includes: [
      "Deep scrubbing of all floors, tiles, and bathroom walls",
      "Stain, grease, and heavy dirt removal from kitchens",
      "Dusting and wiping of fans, tubes, switchboards & balconies"
    ],
    excludes: [
      "Cleaning of inside kitchen storage cabinets / wardrobes",
      "Chandelier cleaning and removal of heavy trash/debris"
    ]
  },
  {
    id: "2",
    name: "Office Cleaning",
    category: "commercial",
    price: "2999",
    duration: "3-8 Hours",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
    description: "Professional office cleaning to maintain a clean, healthy, and productive workspace environment.",
    includes: [
      "Post-construction fine dust extraction from workstation spaces",
      "Glass facade internal pane cleaning and adhesive scraping",
      "Deep pressure wash and sanitization of office cafeteria/restrooms"
    ],
    excludes: [
      "High-rise exterior glass drop-rope cleaning operations",
      "Handling or organization of live server systems / office wiring"
    ]
  },
  {
    id: "3",
    name: "Sofa Cleaning",
    category: "residential",
    price: "499",
    duration: "30-120 Minutes",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80",
    description: "Deep shampooing and upholstery cleaning for your sofa sets to remove dust and deep-seated stains.",
    includes: [
      "Vacuum extraction of embedded hidden crumbs & fine dust",
      "Injection-extraction organic chemical foam shampooing",
      "Fabric color locking enhancement & fresh scent finish spray"
    ],
    excludes: [
      "Genuine leather restorative buffing oils treatment"
    ]
  }
];

{/* --- Details Modal Sheet Component --- */}
const DetailsModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 250 }}
          className="relative bg-white w-full max-w-md rounded-t-2xl max-h-[85vh] flex flex-col z-10 overflow-hidden shadow-2xl"
        >
          {/* Modal Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h3 className="font-bold text-gray-900 text-base">{service.name} Details</h3>
            <button onClick={onClose} className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-4 overflow-y-auto space-y-5 pb-12">
            <div>
              <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-500" /> Includes
              </h4>
              <ul className="space-y-2">
                {service.includes?.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                <X className="w-4 h-4 text-rose-500" /> Excludes
              </h4>
              <ul className="space-y-2">
                {service.excludes?.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Disclaimer
              </p>
              <p className="text-xs text-amber-700 leading-normal">
                Please guarantee that heavy or highly valuable ornaments are securely stored away. Our personnel cannot take administrative liabilities for loose items left unsupervised.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

{/* --- Refactored Original UI Card Layout --- */}
const ServiceCard = ({ service, onOpenDetails }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex gap-4 items-start w-full max-w-md mx-auto">
      <img
        src={service.image}
        alt={service.name}
        className="w-24 h-24 rounded-xl object-cover border border-gray-100 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{service.name}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md tracking-wider">
              {service.category}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-[10px] text-gray-400 font-bold block leading-none">FROM</span>
            <span className="text-lg font-black text-blue-600 block mt-0.5">₹{service.price}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <button
            onClick={() => onOpenDetails(service)}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            View Details
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

{/* --- Main Clean View Component --- */}
const ServicesPage = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    api.get("/services")
      .then(r => {
        if (r.data && Array.isArray(r.data) && r.data.length > 0) {
          setServices(r.data);
        }
      })
      .catch(() => { /* Fallback securely retains default arrays */ });
  }, []);

  // Simple clean matching engine 
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased">
      {/* 1. Header is declared isolated inside its own block context */}
      <div className="w-full bg-white border-b border-gray-100">
        <Header />
      </div>

      {/* 2. Control Row Area: Search and Categories stacked cleanly underneath */}
      <div className="bg-white border-b border-gray-200 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-md mx-auto px-4 space-y-3">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
            />
          </div>

          {/* Clean Categorization Buttons Row */}
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Product Feed Stream List */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4">
        <div className="px-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {filteredServices.length} services found
          </p>
        </div>

        <div className="space-y-4">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenDetails={(srv) => setSelectedService(null) || setSelectedService(srv)}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">No services match your criteria</p>
          </div>
        )}
      </main>

      {/* Floating Info Details Drawer */}
      {selectedService && (
        <DetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServicesPage;
