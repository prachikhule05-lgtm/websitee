export const PROPERTY_TYPES = [
  "1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa/Bungalow", "Office", "Shop", "Restaurant"
];

export const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

export const PUNE_AREAS = [
  "Baner", "Balewadi", "Kothrud", "Aundh", "Wakad", "Hinjewadi", "Pimple Saudagar",
  "Pimple Nilakh", "Pimple Gurav", "Bavdhan", "Sus", "Pashan", "Warje", "Karve Nagar",
  "Erandwane", "Shivajinagar", "Deccan Gymkhana", "Koregaon Park", "Kalyani Nagar",
  "Viman Nagar", "Kharadi", "Hadapsar", "Magarpatta", "NIBM Road", "Undri", "Kondhwa",
  "Katraj", "Dhankawadi", "Bibwewadi", "Wanowrie", "Parvati", "Sinhagad Road",
  "Vishrantwadi", "Lohegaon", "Dhanori", "Yerawada", "Nagar Road", "Wadgaon Sheri",
  "Sopan Baug", "Camp", "Sadashiv Peth", "Narayan Peth", "Kasba Peth", "Swargate",
  "Pune Station Area", "Mundhwa", "Manjri", "Keshav Nagar", "Wagholi", "Alandi Road",
  "Talegaon", "Chinchwad", "Pimpri", "Akurdi", "Nigdi", "Ravet", "Tathawade",
  "Mahalunge", "Bhandari", "Kalewadi", "Moshi", "Chikhali", "Dudulgaon",
  "Other (Custom Area)"
];

export const SERVICES_STATIC = [
  {
    id: "1", name: "Home Deep Cleaning", slug: "home-deep-cleaning",
    description: "Complete deep cleaning for your entire home. Our trained professionals clean every corner.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    startingPrice: 3499, priceType: "by_property", duration: "4-8 Hours",
    features: ["All rooms deep cleaned", "Kitchen & Bathroom", "Furniture dusting", "Floor mopping", "Window cleaning", "Eco-friendly products"],
    propertyPricing: {"1 BHK": 3499, "2 BHK": 4499, "3 BHK": 5999, "4 BHK": 7499, "Villa/Bungalow": 0, "Office": 0, "Shop": 0, "Restaurant": 0},
    isMostPopular: true
  },
  {
    id: "2", name: "Office Cleaning", slug: "office-cleaning",
    description: "Professional office cleaning to maintain a clean and productive workspace.",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1779345169505-be7319f62b97?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    startingPrice: 2999, priceType: "fixed", duration: "3-8 Hours",
    features: ["Workstation cleaning", "Meeting room", "Common area", "Restroom sanitization"],
    propertyPricing: {"1 BHK": 2999, "2 BHK": 3999, "3 BHK": 4999, "4 BHK": 5999, "Villa/Bungalow": 0, "Office": 2999, "Shop": 2999, "Restaurant": 0},
    isMostPopular: false
  },
  {
    id: "3", name: "Sofa Cleaning", slug: "sofa-cleaning",
    description: "Deep shampooing and upholstery cleaning for your sofas and fabric furniture.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    startingPrice: 499, priceType: "per_seat", duration: "30-120 Minutes",
    features: ["Hot water extraction", "Stain removal", "Odor elimination", "Fabric protection"],
    propertyPricing: {"1 BHK": 999, "2 BHK": 1499, "3 BHK": 1999, "4 BHK": 2499, "Villa/Bungalow": 2999, "Office": 1999, "Shop": 1499, "Restaurant": 2499},
    isMostPopular: true
  },
  {
    id: "4", name: "Carpet Cleaning", slug: "carpet-cleaning",
    description: "Professional carpet cleaning using advanced techniques to remove deep-seated dirt.",
    category: "residential",
    image: "https://customer-assets.emergentagent.com/job_royal-book-clean/artifacts/ej574u9w_carpet.jpg",
    startingPrice: 699, priceType: "fixed", duration: "30-90 Minutes",
    features: ["Steam cleaning", "Stain treatment", "Deodorization", "Quick drying"],
    propertyPricing: {"1 BHK": 699, "2 BHK": 999, "3 BHK": 1299, "4 BHK": 1599, "Villa/Bungalow": 1999, "Office": 1499, "Shop": 999, "Restaurant": 1499},
    isMostPopular: false
  },
  {
    id: "5", name: "Kitchen Deep Cleaning", slug: "kitchen-cleaning",
    description: "Thorough deep cleaning of your entire kitchen including appliances, tiles, and surfaces.",
    category: "residential",
    image: "https://customer-assets.emergentagent.com/job_royal-book-clean/artifacts/3z9n88b3_kitchen.jpg",
    startingPrice: 1499, priceType: "fixed", duration: "2-4 Hours",
    features: ["Chimney/hob cleaning", "Tile & grout", "Cabinet cleaning", "Grease removal"],
    propertyPricing: {"1 BHK": 1499, "2 BHK": 1499, "3 BHK": 1499, "4 BHK": 1999, "Villa/Bungalow": 2499, "Office": 1499, "Shop": 1499, "Restaurant": 2999},
    isMostPopular: true
  },
  {
    id: "6", name: "Bathroom Deep Cleaning", slug: "bathroom-cleaning",
    description: "Complete sanitization and deep cleaning for a hygienic, sparkling clean bathroom.",
    category: "residential",
    image: "https://images.pexels.com/photos/9462766/pexels-photo-9462766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    startingPrice: 499, priceType: "per_bathroom", duration: "30-60 Minutes",
    features: ["Tile & grout cleaning", "Toilet sanitization", "Limescale removal", "Fixture polishing"],
    propertyPricing: {"1 BHK": 499, "2 BHK": 999, "3 BHK": 1299, "4 BHK": 1599, "Villa/Bungalow": 1999, "Office": 999, "Shop": 499, "Restaurant": 999},
    isMostPopular: false
  },
  {
    id: "7", name: "Move-In Cleaning", slug: "move-in-cleaning",
    description: "Complete cleaning of your new home before moving in for a fresh hygienic start.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=600&q=80",
    startingPrice: 3999, priceType: "by_property", duration: "5-8 Hours",
    features: ["Complete property cleaning", "Kitchen deep clean", "Bathroom sanitization", "Window cleaning"],
    propertyPricing: {"1 BHK": 3999, "2 BHK": 4999, "3 BHK": 6499, "4 BHK": 7999, "Villa/Bungalow": 0, "Office": 4999, "Shop": 3999, "Restaurant": 5999},
    isMostPopular: false
  },
  {
    id: "8", name: "Move-Out Cleaning", slug: "move-out-cleaning",
    description: "Thorough cleaning when vacating to ensure you get your full security deposit back.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    startingPrice: 3999, priceType: "by_property", duration: "5-8 Hours",
    features: ["Complete property cleaning", "Spot cleaning", "Floor polishing", "Inspection-ready finish"],
    propertyPricing: {"1 BHK": 3999, "2 BHK": 4999, "3 BHK": 6499, "4 BHK": 7999, "Villa/Bungalow": 0, "Office": 4999, "Shop": 3999, "Restaurant": 5999},
    isMostPopular: false
  },
  {
    id: "9", name: "Commercial Cleaning", slug: "commercial-cleaning",
    description: "Professional cleaning solutions for commercial spaces - hotels, restaurants, warehouses.",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&q=80",
    startingPrice: 0, priceType: "custom", duration: "Depends on Site Size",
    features: ["Customized cleaning plan", "Industrial-grade equipment", "Free site inspection", "Competitive pricing"],
    propertyPricing: {"1 BHK": 0, "2 BHK": 0, "3 BHK": 0, "4 BHK": 0, "Villa/Bungalow": 0, "Office": 0, "Shop": 0, "Restaurant": 0},
    isMostPopular: false
  }
];

export const TESTIMONIALS_STATIC = [
  { name: "Priya Sharma", service: "Home Deep Cleaning", rating: 5, location: "Koregaon Park",
    text: "Absolutely amazing service! My 3BHK was cleaned spotlessly. The team was professional, punctual, and used eco-friendly products. Will definitely book again!",
    image: "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?w=100&q=80" },
  { name: "Rahul Mehta", service: "Office Cleaning", rating: 5, location: "Baner",
    text: "Royal Cleaning transformed our office space completely. The team was thorough, efficient, and very professional. Our entire office is sparkling clean!",
    image: "https://images.unsplash.com/photo-1725033489648-a819750348eb?w=100&q=80" },
  { name: "Anita Desai", service: "Sofa Cleaning", rating: 5, location: "Viman Nagar",
    text: "My sofa looks brand new! All the stubborn stains were removed and it smells wonderful. Great value for money and very professional team.",
    image: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=100&q=80" },
  { name: "Suresh Patil", service: "Kitchen Deep Cleaning", rating: 5, location: "Kharadi",
    text: "The kitchen looks brand new! Every corner was cleaned thoroughly. The team worked efficiently and left no mess. Highly recommended!",
    image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&q=80" },
  { name: "Meera Joshi", service: "Move-In Cleaning", rating: 5, location: "Hinjewadi",
    text: "We moved into a perfectly clean home thanks to Royal Cleaning Services. Every nook and corner was spotless. Amazing attention to detail!",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80" },
  { name: "Amit Kumar", service: "Bathroom Deep Cleaning", rating: 4, location: "Wakad",
    text: "Very impressed with the bathroom cleaning. The tiles look sparkling clean and the limescale is completely gone. Very professional team!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
];

export const FAQ_DATA = [
  { q: "What areas in Pune do you serve?", a: "We serve all areas across Pune including Baner, Koregaon Park, Viman Nagar, Kharadi, Hinjewadi, Wakad, Kothrud, Hadapsar, and all other Pune localities." },
  { q: "Do I need to provide cleaning supplies?", a: "No! We bring all professional-grade cleaning equipment and eco-friendly products. You don't need to arrange anything." },
  { q: "How do I pay for the service?", a: "We follow a Pay After Service policy. No advance payment is required. You only pay after the cleaning is completed to your satisfaction." },
  { q: "How long does a typical cleaning take?", a: "It depends on the service and property size. A 2BHK deep cleaning takes 4-6 hours, sofa cleaning takes 1-2 hours, and kitchen cleaning takes 2-3 hours." },
  { q: "Are your cleaning professionals verified?", a: "Yes, all our cleaning professionals are thoroughly background-verified, trained, and experienced. We ensure your home is in safe hands." },
  { q: "What if I'm not satisfied with the cleaning?", a: "We offer a 100% satisfaction guarantee. If you're not happy with the service, we'll re-clean at no extra charge." },
  { q: "Can I book a same-day cleaning service?", a: "Yes! We offer same-day service subject to slot availability. Book early in the day for the best chances of a same-day slot." },
  { q: "Do you use eco-friendly products?", a: "Yes, we use eco-friendly and non-toxic cleaning products that are safe for children, pets, and the environment." },
];

export const BEFORE_AFTER_DATA = [
  { category: "Home", label: "Living Room", 
    before: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
    after: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { category: "Kitchen", label: "Kitchen",
    before: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
  { category: "Sofa", label: "Sofa",
    before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    after: "https://images.unsplash.com/photo-1721977600701-d0e0a617a680?w=800&q=80" },
  { category: "Bathroom", label: "Bathroom",
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80" },
  { category: "Office", label: "Office",
    before: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    after: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80" },
];

export const GST_RATE = 0.18;

export const calculatePrice = (service, propertyType) => {
  if (!service || !propertyType) return { base: 0, gst: 0, total: 0, isCustom: false };
  const pricing = service.propertyPricing || {};
  const base = pricing[propertyType] || 0;
  if (base === 0 && service.priceType === "custom") {
    return { base: 0, gst: 0, total: 0, isCustom: true };
  }
  if (base === 0 && service.priceType !== "custom") {
    return { base: 0, gst: 0, total: 0, isCustom: true };
  }
  const gst = Math.round(base * GST_RATE);
  return { base, gst, total: base + gst, isCustom: false };
};
