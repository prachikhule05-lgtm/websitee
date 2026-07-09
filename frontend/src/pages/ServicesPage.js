import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, X, Check, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES } from "@/constants/testIds";

const categories = [
  "All", 
  "Full House Deep Cleaning", 
  "Customized Cleaning Package", 
  "Commercial Post Interior Cleaning Services"
];

const SERVICES_STATIC = [
  // Category: Full House Deep Cleaning
  {
    id: "fh-1",
    name: "Furnished",
    slug: "furnished",
    category: "Full House Deep Cleaning",
    rating: "4.7",
    duration: "4-8 Hours",
    startingPrice: 2999,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "fh-2",
    name: "Vacant Home Deep Cleaning",
    slug: "vacant-home-deep-cleaning",
    category: "Full House Deep Cleaning",
    rating: "4.4",
    duration: "4-8 Hours",
    startingPrice: 2499,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "fh-3",
    name: "Bungalow/Villa",
    slug: "bungalow-villa",
    category: "Full House Deep Cleaning",
    rating: "4.0",
    duration: "6-12 Hours",
    startingPrice: null, 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60"
  },

  // Category: Customized Cleaning Package
  {
    id: "cc-1",
    name: "Living room Deep Cleaning (Only For Flats)",
    slug: "living-room-deep-cleaning",
    category: "Customized Cleaning Package",
    rating: "5.0",
    duration: "60-120 Minutes",
    startingPrice: 699,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-2",
    name: "Kitchen Deep Cleaning Service",
    slug: "kitchen-deep-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "4.6",
    duration: "2-4 Hours",
    startingPrice: 1049,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-3",
    name: "Bathroom Deep Cleaning Service",
    slug: "bathroom-deep-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "4.5",
    duration: "30-60 Minutes",
    startingPrice: 349,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-4",
    name: "Bedroom Deep Cleaning (Only For Flats)",
    slug: "bedroom-deep-cleaning",
    category: "Customized Cleaning Package",
    rating: "4.5",
    duration: "45-90 Minutes",
    startingPrice: 649,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-5",
    name: "Balcony Cleaning Service",
    slug: "balcony-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "3.9",
    duration: "30-60 Minutes",
    startingPrice: 389,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-6",
    name: "Terrace Cleaning Service",
    slug: "terrace-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "4.5",
    duration: "1-3 Hours",
    startingPrice: 1999,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-7",
    name: "Sofa Shampooing & Upholstery Cleaning",
    slug: "sofa-shampooing",
    category: "Customized Cleaning Package",
    rating: "4.9",
    duration: "30-120 Minutes",
    startingPrice: 469,
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-8",
    name: "Carpet Cleaning Service",
    slug: "carpet-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "4.8",
    duration: "30-90 Minutes",
    startingPrice: 499,
    image: "https://images.unsplash.com/photo-1603712760358-5f9506432231?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-9",
    name: "Chimney Cleaning Service",
    slug: "chimney-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "3.9",
    duration: "1-2 Hours",
    startingPrice: 350,
    image: "https://images.unsplash.com/photo-1521207418485-99c705420785?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-10",
    name: "Fridge Cleaning Service",
    slug: "fridge-cleaning-service",
    category: "Customized Cleaning Package",
    rating: "4.8",
    duration: "30-60 Minutes",
    startingPrice: 349,
    image: "https://images.unsplash.com/photo-1571175432247-5c8e4f016d22?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-11",
    name: "Mini Services",
    slug: "mini-services",
    category: "Customized Cleaning Package",
    rating: "3.3",
    duration: "15-45 Minutes",
    startingPrice: 59,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-12",
    name: "Mattress Shampooing Service",
    slug: "mattress-shampooing-service",
    category: "Customized Cleaning Package",
    rating: "4.8",
    duration: "30-60 Minutes",
    startingPrice: 349,
    image: "https://images.unsplash.com/photo-1632128833917-df2b23ddc637?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cc-13",
    name: "Dining Table & Chairs Cleaning",
    slug: "dining-table-chairs-cleaning",
    category: "Customized Cleaning Package",
    rating: "4.9",
    duration: "30-60 Minutes",
    startingPrice: 249,
    image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?w=500&auto=format&fit=crop&q=60"
  },

  // Category: Commercial Post Interior Cleaning Services
  {
    id: "cm-1",
    name: "Hotel Cleaning",
    slug: "hotel-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "3.3",
    duration: "4-12 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cm-2",
    name: "Office Cleaning",
    slug: "office-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "3.8",
    duration: "3-8 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cm-3",
    name: "Post-Construction / Interior Cleaning",
    slug: "post-construction-interior-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "3.3",
    duration: "5-10 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1505798577917-a65157d4420a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cm-4",
    name: "Restaurant Cleaning",
    slug: "restaurant-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "3.2",
    duration: "4-8 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cm-5",
    name: "Shop / Showroom Cleaning",
    slug: "shop-showroom-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "4.0",
    duration: "2-6 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "cm-6",
    name: "Warehouse / Industrial Cleaning",
    slug: "warehouse-industrial-cleaning",
    category: "Commercial Post Interior Cleaning Services",
    rating: "3.6",
    duration: "6-12 Hours",
    startingPrice: null,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60"
  }
];

const SERVICE_DATA_MAP = {
  "furnished": {
    includes: ["Kitchen deep cleaning (platforms, tiles, sink & cabinet exteriors)", "Bathroom cleaning & sanitization (WC, tiles, fittings & floors)", "Dusting and wiping of living room furniture, fans, and electronics"],
    excludes: ["Cleaning inside closed storage units or deep wardrobe interiors", "Chandelier cleaning or structural wall scraping"]
  },
  "vacant home deep cleaning": {
    includes: ["Complete vacuuming & fine dust extraction from empty rooms", "Thorough scrubbing of all window frames, tracks, and floor panels", "Sanitization of kitchen sinks, countertops, and floor grouting"],
    excludes: ["Furniture cleaning or upholstery conditioning", "Removal of hard paint marks left by active construction crews"]
  },
  "bungalow/villa": {
    includes: ["Deep cleaning tailored for multi-floor 5+ BHK bungalows", "Thorough kitchen scrubbing and extensive bathroom descaling", "Wiping down balcony railings, terrace borders, and main entrances"],
    excludes: ["High-rise rope-dropping operations for exterior glass facades", "Clearing heavy garden waste or construction rubble accumulation"]
  },
  "living room deep cleaning (only for flats)": {
    includes: ["Floor scrubbing, vacuuming, window pane wiping, and wall dusting", "Floor scrubbing, mopping, and electrical switchboard wiping", "Dusting of TV cabinets, display shelves, and decor frames"],
    excludes: ["Shampooing of carpets or sofa upholstery treatment", "Washing or scrubbing down living room painted walls"]
  },
  "kitchen deep cleaning service": {
    includes: ["Countertop & slab cleaning along with exhaust tile scrubbing", "Sink, tap & tiles area cleaning to remove grease stains", "Exterior surface wipe-down of refrigerators and microwave ovens"],
    excludes: ["Internal dynamic sorting of pantry items or container cleaning", "Deep motor internal cleaning of heavy chimney units"]
  },
  "bathroom deep cleaning service": {
    includes: ["Floor & wall tile scrubbing to tackle soap scum build-up", "Toilet, wash basin & fittings cleaning with descaling formulas", "Mirror polishing and window exhaust vent screen dusting"],
    excludes: ["Underlying tile grouting repair or professional plumbing fixes", "Cleaning personal medicine drawers or deep cosmetics vanities"]
  },
  "bedroom deep cleaning (only for flats)": {
    includes: ["Floor cleaning (sweeping & mopping)", "Dusting of furniture (outside only)", "Dry vacuuming of mattresses, window panes, and curtain tracks"],
    excludes: ["Internal deep organization of clothing inside closets", "Wall washing or ceiling spot paint mark treatment"]
  },
  "balcony cleaning service": {
    includes: ["Floor deep cleaning (wet scrubbing & stain removal)", "Wiping balcony glass dividers, railings, and outer mesh screens", "Dusting and clearing floor dust traps from corner areas"],
    excludes: ["Waterproofing treatments for leaky structural joints", "Pruning, repotting, or moving heavy decorative plant collections"]
  },
  "terrace cleaning service": {
    includes: ["Deep pressure wash cleaning of open terrace surfaces", "Targeted bird droppings and tough weather algae stain scrubbing", "Clearing leaves and clearing entry meshes of structural rainwater drains"],
    excludes: ["Applying anti-leak sealants or roof painting modifications", "Disposal of heavy junk furniture items left out on decks"]
  },
  "sofa shampooing & upholstery cleaning": {
    includes: ["Pre-vacuuming to remove loose dust", "Shampoo & foam application for stain treatments", "Extraction vacuuming to remove dirty liquid and expedite drying"],
    excludes: ["Leather structural re-waxing or crack restoration treatments", "Removal of deep permanent chemical markers or burn defects"]
  },
  "carpet cleaning service": {
    includes: ["Dust & stains removal (vacuuming)", "Shampoo-based wash processing targeting embedded odors", "Gentle pile brushing to revitalize underlying texture qualities"],
    excludes: ["Repairing torn or frayed edge strings on antique rugs", "Treating severe base dye bleeding caused by old spills"]
  },
  "chimney cleaning service": {
    includes: ["Removal of heavy internal oil filters and grease-dissolving soak", "Scrubbing outer hood surfaces, buttons, and collection trays", "Wiping surrounding kitchen tiles affected by soot exhaust"],
    excludes: ["Repairing electronic circuit failure chips or duct replacements", "Duct cleaning lines running beyond internal room limits"]
  },
  "fridge cleaning service": {
    includes: ["Complete inside cleaning of fridge", "Shelves, trays & drawers removal and washing", "Exterior door wipe-down and rubber magnetic gasket disinfection"],
    excludes: ["Rear gas coil maintenance or compressor technical testing", "Fixing broken plastic internal freezer compartment shelves"]
  },
  "mini services": {
    includes: ["Chimney cleaning touch up", "Fridge cleaning (Interior & Exterior touch up)", "Combo quick dust wipe for appliances like exhaust and ceiling fans"],
    excludes: ["Deep chemical dismantling of complex machinery layouts", "Extended service hours expanding past basic light touch-ups"]
  },
  "mattress shampooing service": {
    includes: ["High-power vacuuming to remove dust & hair", "Foam / shampoo-based deep cleaning", "Anti-bacterial sanitization spray to remove underlying musty odors"],
    excludes: ["Complete spring or structural frame restoration inside mattresses", "Removing old deep-set chemical dye transfers or bodily stains"]
  },
  "dining table & chairs cleaning": {
    includes: ["Dining table surface cleaning", "Chair seat & backrest cleaning", "Polishing outer frames of table legs and structural border lines"],
    excludes: ["Deep wood scratch filling or professional varnish recoating", "Washing complex silk accent cushions attached to frames"]
  },
  "hotel cleaning": {
    includes: ["Deep cleaning for hotel rooms, lobbies, kitchens, and common zones", "Sanitizing public restrooms, counter setups, and waiting lounge sofas", "Polishing interior glass doorways and check-in desk panel counters"],
    excludes: ["Room laundry washing services or making up bed linens", "Kitchen cold storage deep inventory defrost organization"]
  },
  "office cleaning": {
    includes: ["Workstation, floors, glass, washroom cleaning for a healthy workspace", "Vacuuming carpeted floor tiles and high-traffic aisleways", "Sanitizing conference room tables and shared office pantry setups"],
    excludes: ["Handling active server system terminal wires or data racks", "High-rise outer window panel maintenance using suspended cradles"]
  },
  "post-construction / interior cleaning": {
    includes: ["Heavy-duty cleaning after renovation including debris removal, paint marks, dust extraction", "Scraping paint marks, adhesive residues, and cement splashes off floors", "Deep vacuuming inside open wall tracks, sockets, and window crevices"],
    excludes: ["Moving major construction equipment or hauling structural steel/rubble", "Repairing damaged drywall trims or chipped glass edges"]
  },
  "restaurant cleaning": {
    includes: ["Complete kitchen degreasing, exhaust cleaning, dining area sanitization for FSSAI-level hygiene", "Scrubbing high-traffic tile floors and sanitizing customer washrooms"],
    excludes: ["Deep servicing of complex commercial walk-in freezer motors", "Pest control bait setups (unless booked as an addon package)"]
  },
  "shop / showroom cleaning": {
    includes: ["Floor polishing, glass cleaning, dust removal to enhance customer experience", "Polishing retail display counter frames and storefront main windows"],
    excludes: ["Inventory product scanning, restocking, or handling point-of-sale systems", "Repairing spot lighting tracking installations on high ceilings"]
  },
  "warehouse / industrial cleaning": {
    includes: ["Large-area cleaning with machines, ideal for storage units and factories", "Dusting heavy storage pallet racks and loading bay areas"],
    excludes: ["Moving hazardous chemical barrels or active forklift machinery operation", "Clearing high roof ceiling structural truss framing dust bands"]
  },
  "default": {
    includes: ["Standard deep cleaning & scrubbing of target surfaces", "Eco-friendly cleaning agents application for spot treatment", "Mopping and surface polishing of primary floors"],
    excludes: ["Cleaning inside locked storage spaces or delicate appliances", "High-level external window reach adjustments"]
  }
};

const DetailsModal = ({ service, onClose, onAdd, isAdded }) => {
  if (!service) return null;

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
          <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-20">
            <h2 className="font-extrabold text-gray-900 text-sm tracking-tight truncate pr-4">
              {service.name} Info
            </h2>
            <button onClick={onClose} className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <X className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          <div className="p-4 space-y-4 pb-24 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600 bg-gray-50 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-amber-500 text-sm">★</span>
                <span>{service.rating || "4.7"} Rating</span>
              </div>
              <div className="border-l border-gray-200 flex items-center justify-center">
                {service.duration || "2 Hours"} Duration
              </div>
            </div>

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
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-20">
            <button
              onClick={() => {
                onAdd(service);
                onClose();
              }}
              className={`w-full py-2.5 font-bold rounded-xl text-center block text-xs tracking-wide shadow-xs transition-all ${
                isAdded 
                  ? "bg-rose-500 hover:bg-rose-600 text-white" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isAdded ? "Remove from Package" : `Add to Package ${service.startingPrice ? `— ₹${service.startingPrice.toLocaleString("en-IN")}` : ""}`}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const HorizontalServiceCard = ({ service, index, onOpenDetails, onAdd, isAdded }) => {
  const serviceKey = service.name?.toLowerCase().trim() || "";
  const fallbackData = SERVICE_DATA_MAP[serviceKey] || SERVICE_DATA_MAP["default"];
  const standardIncludes = service.includes && service.includes.length > 0 ? service.includes : fallbackData.includes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`bg-white border rounded-2xl p-4 hover:shadow-md transition-all duration-200 max-w-2xl mx-auto w-full ${
        isAdded ? "border-emerald-500 bg-emerald-50/10" : "border-gray-100"
      }`}
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

        <button
          type="button"
          onClick={() => onAdd(service)}
          className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
            isAdded 
              ? "bg-rose-500 hover:bg-rose-600 text-white" 
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isAdded ? "Remove" : "Add +"}
        </button>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const [apiServices, setApiServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
  
  // Cart state to handle multi-service selections
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    api.get("/services")
      .then(r => {
        if (r.data && r.data.length > 0) {
          setApiServices(r.data);
        }
      })
      .catch((err) => console.log("API error, using fallbacks:", err))
      .finally(() => setLoading(false));
  }, []);

  // Handlers to add or remove services from the cart list
  const handleCartToggle = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, s) => sum + (s.startingPrice || 0), 0);
  };

  const handleProceedToBooking = () => {
    // Navigate with complete list attached to location state object
    navigate("/booking", {
      state: { selectedServices }
    });
  };

  // --- FAILSafe Smart Filter Engine ---
  const getFilteredServices = () => {
    let results = apiServices.filter(s => {
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || (s.category && s.category.toLowerCase().trim().includes(category.toLowerCase().trim().substring(0, 10)));
      return matchSearch && matchCat;
    });

    if (results.length === 0) {
      results = SERVICES_STATIC.filter(s => {
        const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "All" || s.category === category;
        return matchSearch && matchCat;
      });
    }

    return results;
  };

  const filtered = getFilteredServices();

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col font-sans antialiased">
      <div className="relative z-30 bg-white">
        <Header />
      </div>
      
      <main className="flex-1 pb-32">
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
                onAdd={handleCartToggle}
                isAdded={!!selectedServices.find(s => s.id === service.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl mt-4 p-6">
              <p className="text-sm font-bold text-gray-700">No services found</p>
            </div>
          )}
        </div>
      </main>

      {/* Persistent Bottom Drawer / Floating Cart UI CTA */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-xl z-40 p-4 pb-6"
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl hidden sm:block">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    Total: <span className="text-emerald-600 font-bold">₹{calculateTotal().toLocaleString("en-IN")}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={handleProceedToBooking}
                className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wide rounded-xl shadow-md transition-all text-center"
              >
                Continue Booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedServiceDetails && (
        <DetailsModal 
          service={selectedServiceDetails} 
          onClose={() => setSelectedServiceDetails(null)} 
          onAdd={handleCartToggle}
          isAdded={!!selectedServices.find(s => s.id === selectedServiceDetails.id)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServicesPage;
