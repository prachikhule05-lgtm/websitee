import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, AlertTriangle, ShoppingCart, ArrowRight, Star, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";

// Pure clean UI categories layout strings
const categories = ["All", "Residential", "Commercial"];

{/* --- Category Matrix mapping for flexible database tags --- */}
const CATEGORY_DATA_MAP = {
  "residential": {
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
  "commercial": {
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
  "default": {
    includes: [
      "Standard deep cleaning & scrubbing of target surfaces",
      "Eco-friendly cleaning agents application for spot treatment",
      "Mopping and surface polishing of primary floors"
    ],
    excludes: [
      "Cleaning inside locked storage spaces or delicate appliances",
      "High-level external window reach adjustments"
    ]
  }
};

const INITIAL_STATIC_SERVICES = [
  {
    id: "fh-1bhk",
    slug: "1-bhk-deep-cleaning",
    name: "Home Deep Cleaning",
    category: "residential",
    startingPrice: 3499,
    duration: "4-8 Hours",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    includes: ["Deep scrubbing of floors & tiles", "Stain, grease & heavy dirt removal", "Eco-friendly cleaning agents application"],
    excludes: ["Cleaning of inside kitchen storage cabinets & bathroom windows", "Exterior high-rise glass beyond safe immediate physical reach"]
  },
  {
    id: "comm-office",
    slug: "post-construction-office",
    name: "Office Cleaning",
    category: "commercial",
    startingPrice: 2999,
    duration: "3-8 Hours",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
    includes: ["Deep scrubbing of floors & tiles", "Stain, grease & heavy dirt removal", "Eco-friendly cleaning agents application"],
    excludes: ["External high-altitude rope-access glass cradle wash cycles"]
  },
  {
    id: "cust-sofa",
    slug: "sofa-dry-cleaning",
    name: "Sofa Cleaning",
    category: "residential",
    startingPrice: 499,
    duration: "30-120 Minutes",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80",
    includes: ["Deep shampooing and upholstery cleaning"],
    excludes: ["Genuine leather restorative buffing oils treatment"]
  }
];

{/* --- Bottom Sheet Info Modal Component --- */}
const DetailsModal = ({ service, onClose, onAddToCart, isInCart }) => {
  if (!service) return null;

  const catKey = service.category?.toLowerCase() || "default";
  const fallbackData = CATEGORY_DATA_MAP[catKey] || CATEGORY_DATA_MAP["default"];

  const includesList = service.includes && service.includes.length > 0 ? service.includes : fallbackData.includes;
  const excludesList = service.excludes && service.excludes.length > 0 ? service.excludes : fallbackData.excludes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs px-2 sm:px-0">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 240 }}
          className="relative bg-white w-full max-w-md rounded-t-2xl max-h-[75vh] shadow-2xl flex flex-col z-10 overflow-hidden mb-16 md:mb-0"
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-20">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight truncate pr-4">
              {service.name} Details
            </h2>
            <button onClick={onClose} className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-4 space-y-4 pb-24 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600 bg-gray-50 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{service.rating || "4.9"} Rating</span>
              </div>
              <div className="border-l border-gray-200 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{service.duration || "4 Hours"}</span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-500" /> Includes
              </h4>
              <ul className="space-y-1.5 pl-0.5">
                {includesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1.5 flex items-center gap-1">
                <X className="w-4 h-4 text-rose-500" /> Excludes
              </h4>
              <ul className="space-y-1.5 pl-0.5">
                {excludesList.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Disclaimer
              </p>
              <p className="text-xs text-amber-700 leading-normal font-medium">
                Please guarantee that heavy or highly valuable ornaments are securely stored away. Our personnel cannot take administrative liabilities for loose items left unsupervised.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-20">
            <button
              onClick={() => { onAddToCart(service); onClose(); }}
              className={`w-full py-2.5 font-bold rounded-xl text-center text-xs tracking-wide transition-all cursor-pointer ${
                isInCart 
                  ? "bg-rose-600 hover:bg-rose-700 text-white" 
                  : "bg-amber-500 hover:bg-amber-600 text-white"
              }`}
            >
              {isInCart ? "Remove Selection" : `Book Now — ₹${service.startingPrice?.toLocaleString("en-IN")}`}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

{/* --- Horizontal Service List Item Component --- */}
const HorizontalServiceCard = ({ service, index, onOpenDetails, onAddToCart, isInCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-all duration-200 max-w-2xl mx-auto w-full"
    >
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 mt-1">
          <img
            src={service.image}
            alt={service.name}
            className="w-20 h-20 rounded-xl object-cover border border-gray-100"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug truncate">
                {service.name}
              </h3>
              
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                  {service.category}
                </span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-gray-600">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {service.rating || "4.9"}
                </span>
                <span className="text-gray-300 text-[10px]">•</span>
                <span className="text-xs text-gray-500 font-medium">
                  {service.duration || "4 Hours"}
                </span>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="block text-[8px] tracking-wider text-gray-400 font-bold uppercase leading-none">FROM</span>
              <span className="text-base sm:text-lg font-black text-blue-600 block mt-0.5 whitespace-nowrap">
                ₹{service.startingPrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {service.includes && service.includes.length > 0 && (
            <div className="mt-3 bg-gray-50/60 rounded-xl p-2.5 border border-gray-100/50">
              <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400 mb-1">INCLUDES:</p>
              <ul className="space-y-1">
                {service.includes.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 leading-normal">
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50">
            <button
              type="button"
              onClick={() => onOpenDetails(service)}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              View Details
            </button>

            <button
              onClick={() => onAddToCart(service)}
              className={`px-5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 cursor-pointer active:scale-95 ${
                isInCart 
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              {isInCart ? "Added ✓" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

{/* --- Complete Responsive Main Layout Wrap --- */}
const ServicesPage = () => {
  const [services, setServices] = useState(INITIAL_STATIC_SERVICES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get("/services").then(r => {
      if (r.data && Array.isArray(r.data) && r.data.length > 0) {
        setServices(r.data);
      }
    }).catch(() => {
      // Automatic fallback recovery handling 
    }).finally(() => setLoading(false));
  }, []);

  const handleToggleCart = (service) => {
    setCart((prev) => {
      const alreadyInCart = prev.some(item => item.id === service.id);
      if (alreadyInCart) {
        return prev.filter(item => item.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const cartTotal = cart.reduce((acc, current) => acc + (current.startingPrice || 0), 0);

  const handleConfirmAndSendToWhatsApp = () => {
    if (cart.length === 0) return;
    const targetWhatsAppNumber = "919999999999"; 
    let msgText = `*⚡ New Royal Cleaning Service Booking Request* \n\n`;
    cart.forEach((item, i) => {
      msgText += `${i + 1}. *${item.name}* — ₹${item.startingPrice} (${item.duration || 'N/A'})\n`;
    });
    msgText += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msgText += `💰 *Total Estimated Value:* ₹${cartTotal.toLocaleString("en-IN")}\n\n`;
    msgText += `Please confirm availability and schedule my slot. Thanks!`;

    window.open(`https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodeURIComponent(msgText)}`, "_blank");
  };

  // Fixed clean match category lookup mapping algorithm
  const filtered = services.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase()));

    if (category === "All") return matchSearch;

    const dbCategoryTag = s.category?.toLowerCase().trim() || "";
    const activeUIPillName = category.toLowerCase().trim();

    return matchSearch && (dbCategoryTag === activeUIPillName);
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased">
      {/* Structural Isolation Layout Block Container */}
      <div className="relative w-full block bg-white z-40 border-b border-gray-100">
        <Header />
      </div>
      
      <main className="flex-1 pb-36">
        {/* Navigation Control Tray */}
        <div className="bg-white border-b border-gray-200/80 sticky top-0 z-30 py-3 shadow-xs">
          <div className="max-w-2xl mx-auto px-4">
            
            {/* Horizontal Navigation Categories Ribbon Rows Menu */}
            <div className="flex overflow-x-auto gap-2 pb-2.5 scrollbar-none -mx-4 px-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    category === cat
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Input Filter Bar Field Component Layout */}
            <div className="relative mt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a service package (e.g. Home, Sofa)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Display Rendering Catalog Stream List Grid Layout */}
        <div className="w-full max-w-2xl mx-auto px-3 mt-5">
          <div className="mb-3 px-1 flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              {category} ({filtered.length})
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((service, i) => (
              <HorizontalServiceCard
                key={service.id || service.slug || i}
                service={service}
                index={i}
                isInCart={cart.some(item => item.id === service.id)}
                onOpenDetails={(srv) => setSelectedServiceDetails(srv)}
                onAddToCart={handleToggleCart}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl mt-2 p-6 shadow-xs">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">No services found matching criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Checkout Drawer Action Panel Sticky Elements */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-40 p-4 pb-6 md:pb-4 max-w-2xl mx-auto rounded-t-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-amber-100 p-2 rounded-xl relative">
                  <ShoppingCart className="w-5 h-5 text-amber-600" />
                  <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Selected Packages</p>
                  <p className="text-sm font-black text-slate-900">₹{cartTotal.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <button
                onClick={handleConfirmAndSendToWhatsApp}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
              >
                <span>Book via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Info Sheet Float Drawer Details Overlay */}
      {selectedServiceDetails && (
        <DetailsModal 
          service={selectedServiceDetails} 
          isInCart={cart.some(item => item.id === selectedServiceDetails.id)}
          onClose={() => setSelectedServiceDetails(null)} 
          onAddToCart={handleToggleCart}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServicesPage;
