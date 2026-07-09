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

{/* --- Map Data Using Exact Service Names From All Screenshots --- */}
const SERVICE_DATA_MAP = {
  // === Full House Deep Cleaning ===
  "furnished": {
    includes: [
      "Kitchen deep cleaning (platforms, tiles, sink & cabinet exteriors)",
      "Bathroom cleaning & sanitization (WC, tiles, fittings & floors)",
      "Dusting and wiping of living room furniture, fans, and electronics"
    ],
    excludes: [
      "Cleaning inside closed storage units or deep wardrobe interiors",
      "Chandelier cleaning or structural wall scraping"
    ]
  },
  "vacant home deep cleaning": {
    includes: [
      "Complete vacuuming & fine dust extraction from empty rooms",
      "Thorough scrubbing of all window frames, tracks, and floor panels",
      "Sanitization of kitchen sinks, countertops, and floor grouting"
    ],
    excludes: [
      "Furniture cleaning or upholstery conditioning (since vacant)",
      "Removal of hard paint marks left by active construction crews"
    ]
  },
  "bungalow/villa": {
    includes: [
      "Deep cleaning tailored for multi-floor 5+ BHK bungalows",
      "Thorough kitchen scrubbing and extensive bathroom descaling",
      "Wiping down balcony railings, terrace borders, and main entrances"
    ],
    excludes: [
      "High-rise rope-dropping operations for exterior glass facades",
      "Clearing heavy garden waste or construction rubble accumulation"
    ]
  },

  // === Customized Cleaning Package ===
  "living room deep cleaning (only for flats)": {
    includes: [
      "Sofa dry vacuuming, window pane wiping, and wall dusting",
      "Floor scrubbing, mopping, and electrical switchboard wiping",
      "Dusting of TV cabinets, display shelves, and decor frames"
    ],
    excludes: [
      "Shampooing of carpets or sofa upholstery treatment",
      "Washing or scrubbing down living room painted walls"
    ]
  },
  "kitchen deep cleaning service": {
    includes: [
      "Countertop & slab cleaning along with exhaust tile scrubbing",
      "Sink, tap & tiles area cleaning to remove grease stains",
      "Exterior surface wipe-down of refrigerators and microwave ovens"
    ],
    excludes: [
      "Internal dynamic sorting of pantry items or container cleaning",
      "Deep motor internal cleaning of heavy chimney units"
    ]
  },
  "bathroom deep cleaning service": {
    includes: [
      "Floor & wall tile scrubbing to tackle soap scum build-up",
      "Toilet, wash basin & fittings cleaning with descaling formulas",
      "Mirror polishing and window exhaust vent screen dusting"
    ],
    excludes: [
      "Underlying tile grouting repair or professional plumbing fixes",
      "Cleaning personal medicine drawers or deep cosmetics vanities"
    ]
  },
  "bedroom deep cleaning (only for flats)": {
    includes: [
      "Floor cleaning (comprehensive sweeping & mopping configurations)",
      "Dusting of furniture items (exterior cabinet & frame surfaces only)",
      "Dry vacuuming of mattresses, window panes, and curtain tracks"
    ],
    excludes: [
      "Internal deep organization of clothing inside closets",
      "Wall washing or ceiling spot paint mark treatment"
    ]
  },
  "balcony cleaning service": {
    includes: [
      "Floor deep cleaning (wet scrubbing & hard stain removal treatments)",
      "Wiping balcony glass dividers, railings, and outer mesh screens",
      "Dusting and clearing floor dust traps from corner areas"
    ],
    excludes: [
      "Waterproofing treatments for leaky structural joints",
      "Pruning, repotting, or moving heavy decorative plant collections"
    ]
  },
  "terrace cleaning service": {
    includes: [
      "Deep pressure wash cleaning of open terrace surfaces to clear dust & mud",
      "Targeted bird droppings and tough weather algae stain scrubbing",
      "Clearing leaves and clearing entry meshes of structural rainwater drains"
    ],
    excludes: [
      "Applying anti-leak sealants or roof painting modifications",
      "Disposal of heavy junk furniture items left out on decks"
    ]
  },
  "sofa shampooing & upholstery cleaning": {
    includes: [
      "Pre-vacuuming to remove loose dust, crumbs, and hidden debris",
      "Shampoo & foam injection application for embedded stain treatment",
      "Extraction vacuuming to remove dirty liquid and expedite drying"
    ],
    excludes: [
      "Leather structural re-waxing or crack restoration treatments",
      "Removal of deep permanent chemical markers or burn defects"
    ]
  },
  "carpet cleaning service": {
    includes: [
      "Dust & stains removal utilizing specialized vacuum treatments",
      "Shampoo-based wash processing targeting embedded odors",
      "Gentle pile brushing to revitalize underlying texture qualities"
    ],
    excludes: [
      "Repairing torn or frayed edge strings on antique rugs",
      "Treating severe base dye bleeding caused by old spills"
    ]
  },
  "chimney cleaning service": {
    includes: [
      "Removal of heavy internal oil filters and grease-dissolving soak",
      "Scrubbing outer hood surfaces, buttons, and collection trays",
      "Wiping surrounding kitchen tiles affected by soot exhaust"
    ],
    excludes: [
      "Repairing electronic circuit failure chips or duct replacements",
      "Duct cleaning lines running beyond internal room limits"
    ]
  },
  "fridge cleaning service": {
    includes: [
      "Complete inside cleaning of fridge compartments and side walls",
      "Shelves, trays & drawers removal, soaking, and washing",
      "Exterior door wipe-down and rubber magnetic gasket disinfection"
    ],
    excludes: [
      "Rear gas coil maintenance or compressor technical testing",
      "Fixing broken plastic internal freezer compartment shelves"
    ]
  },
  "mini services": {
    includes: [
      "Combo quick dust wipe for appliances like exhaust and ceiling fans",
      "Exterior cleaning check adjustments for small house fixtures",
      "Quick spot check surface vacuum treatments on priority items"
    ],
    excludes: [
      "Deep chemical dismantling of complex machinery layouts",
      "Extended service hours expanding past basic light touch-ups"
    ]
  },
  "mattress shampooing service": {
    includes: [
      "High-power vacuuming to remove dust, hair, and microscopic flakes",
      "Foam / shampoo-based deep cleaning to fade surface sweat stains",
      "Anti-bacterial sanitization spray to remove underlying musty odors"
    ],
    excludes: [
      "Complete spring or structural frame restoration inside mattresses",
      "Removing old deep-set chemical dye transfers or bodily stains"
    ]
  },
  "dining table & chairs cleaning": {
    includes: [
      "Dining table surface cleaning to clear sticky grease residue",
      "Chair seat & backrest cleaning matching structural design needs",
      "Polishing outer frames of table legs and structural border lines"
    ],
    excludes: [
      "Deep wood scratch filling or professional varnish recoating",
      "Washing complex silk accent cushions attached to frames"
    ]
  },

  // === Commercial Post Interior Cleaning Services ===
  "hotel cleaning": {
    includes: [
      "Deep cleaning for hotel rooms, lobbies, kitchens, and common zones",
      "Sanitizing public restrooms, counter setups, and waiting lounge sofas",
      "Polishing interior glass doorways and check-in desk panel counters"
    ],
    excludes: [
      "Room laundry washing services or making up bed linens",
      "Kitchen cold storage deep inventory defrost organization"
    ]
  },
  "office cleaning": {
    includes: [
      "Workstation desks, floor areas, glass panels, and washroom cleaning",
      "Vacuuming carpeted floor tiles and high-traffic aisleways",
      "Sanitizing conference room tables and shared office pantry setups"
    ],
    excludes: [
      "Handling active server system terminal wires or data racks",
      "High-rise outer window panel maintenance using suspended cradles"
    ]
  },
  "post-construction / interior cleaning": {
    includes: [
      "Heavy-duty cleaning after renovations including fine white dust extraction",
      "Scraping paint marks, adhesive residues, and cement splashes off floors",
      "Deep vacuuming inside open wall tracks, sockets, and window crevices"
    ],
    excludes: [
      "Moving major construction equipment or hauling structural steel/rubble",
      "Repairing damaged drywall trims or chipped glass edges"
    ]
  },
  "restaurant cleaning": {
    includes: [
      "Complete kitchen degreasing, exhaust hood scrub, and floor washing",
      "Dining area sanitization for FSSAI-level hygiene guidelines",
      "Scrubbing high-traffic tile floors and sanitizing customer washrooms"
    ],
    excludes: [
      "Deep servicing of complex commercial walk-in freezer motors",
      "Pest control bait setups (unless booked as an addon package)"
    ]
  },
  "shop / showroom cleaning": {
    includes: [
      "Floor polishing, glass display case cleaning, and fine dust removal",
      "Polishing retail display counter frames and storefront main windows",
      "Dusting clothing storage racks, clothing displays, and trail rooms"
    ],
    excludes: [
      "Inventory product scanning, restocking, or handling point-of-sale systems",
      "Repairing spot lighting tracking installations on high ceilings"
    ]
  },
  "warehouse / industrial cleaning": {
    includes: [
      "Large-area floor cleaning using specialized automated floor machines",
      "Dusting heavy storage pallet racks and loading bay areas",
      "Sweeping and vacuuming concrete lanes and warehouse office spaces"
    ],
    excludes: [
      "Moving hazardous chemical barrels or active forklift machinery operation",
      "Clearing high roof ceiling structural truss framing dust bands"
    ]
  },

  // === Default Fallback ===
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

{/* --- Dynamic Ultra-Compact Bottom Sheet Modal --- */}
const DetailsModal = ({ service, onClose }) => {
  if (!service) return null;

  // Use normalized service name for dictionary lookup
  const serviceKey = service.name?.toLowerCase().trim() || "";
  const fallbackData = SERVICE_DATA_MAP[serviceKey] || SERVICE_DATA_MAP["default"];

  const includesList = service.includes && service.includes.length > 0 ? service.includes : fallbackData.includes;
  const excludesList = service.excludes && service.excludes.length > 0 ? service.excludes : fallbackData.excludes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs px-2 sm:px-0">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 240 }}
          className="relative bg-white w-full max-w-md rounded-t-2xl max-h-[70vh] shadow-2xl flex flex-col z-10 overflow-hidden mb-16 md:mb-0"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-20">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight truncate pr-4">
              {service.name} Info
            </h2>
            <button onClick={onClose} className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Data Body */}
          <div className="p-4 space-y-4 pb-20 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600 bg-gray-50 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-amber-500 text-sm">★</span>
                <span>{service.rating || "4.7"} Rating</span>
              </div>
              <div className="border-l border-gray-200 flex items-center justify-center">
                {service.duration || "2 Hours"} Duration
              </div>
            </div>

            {/* Dynamic Includes Fields */}
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

            {/* Dynamic Excludes Fields */}
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

            {/* Disclaimer */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5">
              <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Disclaimer
              </p>
              <p className="text-[11px] text-amber-700 leading-normal font-medium">
                Please ensure valuables are securely stored. The team is not responsible for unsupervised items.
              </p>
            </div>
          </div>

          {/* Bottom Call Action */}
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

{/* --- Main Service Card --- */}
const HorizontalServiceCard = ({ service, index, onOpenDetails }) => {
  const serviceKey = service.name?.toLowerCase().trim() || "";
  const fallbackData = SERVICE_DATA_MAP[serviceKey] || SERVICE_DATA_MAP["default"];
  const standardIncludes = service.includes && service.includes.length > 0 ? service.includes : fallbackData.includes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 max-w-2xl mx-auto w-full"
    >
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
                {service.startingPrice ? `₹${service.startingPrice.toLocaleString("en-IN")}` : "Custom Price"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Sub-Card Quick View Includes list */}
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

{/* --- Complete Master Layout Page Wrapper --- */}
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
    const matchCat = category === "All" || (s.category && category.toLowerCase().trim() === s.category.toLowerCase().trim());
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col font-sans antialiased">
      <div className="relative z-30 bg-white">
        <Header />
      </div>
      
      <main className="flex-1 pb-24">
        {/* Navigation Sticky Controls */}
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
            </div>
          </div>
        </div>

        {/* Master Output Grid list container */}
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

      {/* Floating Dynamic Details Overlay Sheet */}
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
