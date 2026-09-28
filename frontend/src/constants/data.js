export const PROPERTY_TYPES = [
  "1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa/Bungalow", "Office", "Shop", "Restaurant"
];

export const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

export const PUNE_AREAS = [
  "Agarkar Nagar", "Akurdi", "Alandi", "Alandi Road", "Amanora Park Town", "Ambegaon", "Ambegaon Budruk", "Ambegaon Khurd", "Ambegaon Pathar", "Anand Nagar", "Aundh", "Aundh Annexe", "Aundh Gaon", "Awhalwadi",
  "Bajirao Road", "Bakori", "Balaji Nagar", "Balewadi", "Balewadi High Street", "Balewadi Phata", "Baner", "Baner Gaon", "Baner-Pashan Link Road", "Bavdhan", "Bavdhan Budruk", "Bavdhan Khurd", "Bhawani Peth", "Bhekrai Nagar", "Bhosale Nagar", "Bhosari", "Bhosari MIDC", "Bhugaon", "Bhukum", "Bhumkar Chowk", "Bhusari Colony", "Bibwewadi", "Blue Ridge Township", "Boat Club Road", "Bopkhel", "Bopodi", "BT Kawade Road", "Budhwar Peth", "Bund Garden", "Bund Garden Road",
  "Camp", "Chakan", "Chandan Nagar", "Chandani Chowk", "Charholi Budruk", "Charholi Khurd", "Chikhali", "Chinchwad", "Chinchwad Gaon", "Chinchwad Station", "Chintamani Nagar", "Clover Park",
  "Dahanukar Colony", "Dange Chowk", "Dapodi", "Dattanagar", "Dattawadi", "Deccan", "Deccan Gymkhana", "Dehu", "Dehu Road", "Dhankawadi", "Dhanori", "Dhayari", "Dhayari Phata", "Dhole Patil Road", "Dighi", "Dudulgaon",
  "Empress Garden", "Erandwane",
  "Fatima Nagar", "FC Road (Fergusson College Road)", "Fursungi (Phursungi)",
  "Gahunje", "Ganesh Nagar", "Ganesh Peth", "Ganeshkhind", "Ganga Dham", "Ghorpade Peth", "Ghorpadi", "Ghorpadi Gaon", "Gokhale Nagar", "Gokul Nagar", "Gultekdi", "Guru Nanak Nagar", "Guruganesh Nagar", "Guruwar Peth",
  "Hadapsar", "Hadapsar Gaon", "Hadapsar Industrial Estate", "Handewadi", "Handewadi Road", "Hingne Budruk", "Hingne Khurd", "Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3",
  "Ideal Colony", "Indira Nagar", "Indrayani Nagar",
  "JM Road (Jangli Maharaj Road)",
  "Kachare Colony", "Kalas", "Kale Padal", "Kalewadi", "Kalyani Nagar", "Karve Nagar", "Karve Road", "Kasar Amboli", "Kasarwadi", "Kasba Peth", "Kaspate Wasti", "Katraj", "Katraj-Kondhwa Road", "Keshav Nagar", "Kesnand", "Khadakwasla", "Khadki", "Kharadi", "Kharadi South", "Khed Shivapur", "Kirkatwadi", "Kiwale", "Kondhawe Dhawade", "Kondhwa", "Kondhwa Budruk", "Kondhwa Khurd", "Koregaon Bhima", "Koregaon Park", "Koregaon Park Annexe", "Kothrud", "Kothrud Depot",
  "Law College Road", "Lavale", "Lohegaon", "Lokmanya Nagar", "Loni Kalbhor", "Lonikand", "Lulla Nagar",
  "Maan", "Magarpatta City", "Mahalunge", "Maharshi Nagar", "Mahatma Phule Peth", "Mamurdi", "Mandai", "Mangalwar Peth", "Manik Baug", "Manjri", "Manjri Budruk", "Manjri Khurd", "Markal", "Market Yard", "Marunji", "Masulkar Colony", "Mayur Colony", "MG Road", "Mhada Colony", "Mitramandal Colony", "Model Colony", "Mohammed Wadi", "Mohan Nagar", "Moshi", "Moshi Pradhikaran", "Mukund Nagar", "Mulshi", "Mundhwa",
  "Nagar Road", "Nana Peth", "Nande", "Nanded City", "Narayan Peth", "Narhe", "Narhe Ambegaon", "Navi Peth", "NDA Road", "Nehru Nagar", "New Sangvi", "NIBM", "NIBM Annexe", "NIBM Road", "Nigdi", "Nigdi Pradhikaran", "Nilakh",
  "Old Mumbai-Pune Highway", "Old Sangvi",
  "Padmavati", "Panshet", "Parvati", "Parvati Darshan", "Parvati Gaon", "Parvati Paytha", "Pashan", "Pashan-Sus Road", "Patil Nagar", "Paud", "Paud Road", "Phugewadi", "Pimple Gurav", "Pimple Nilakh", "Pimple Saudagar", "Pimpri", "Pimpri Colony", "Pirangut", "Pisoli", "Prabhat Road", "Pradhikaran", "Punawale", "Pune Cantonment", "Pune Railway Station", "Pune University (SPPU)",
  "Rahatani", "Rambaug Colony", "Ramtekdi", "Range Hills", "Rasta Peth", "Ravet", "Raviwar Peth", "Revenue Colony", "Rohan Nilay",
  "Sadashiv Peth", "Sadhu Vaswani Chowk", "Sahakar Nagar", "Sainath Nagar", "Sakore Nagar", "Salisbury Park", "Salunke Vihar", "Sambhaji Nagar", "Sanaswadi", "Sangamvadi", "Sangvi", "Sanjay Park", "Sant Tukaram Nagar", "Sasane Nagar", "Saswad", "Saswad Road", "Satara Road", "Satav Nagar", "Senapati Bapat Road (SB Road)", "Shaniwar Peth", "Shaniwar Wada", "Shankar Kalat Nagar", "Shankar Shet Road", "Shastri Nagar", "Shewalewadi", "Shikrapur", "Shinde Chhatri", "Shivajinagar", "Shivane", "Shivतीर्थ Nagar (Shivtirth Nagar)", "Shukrawar Peth", "Sinhagad Road", "Somatne Phata", "Somwar Peth", "Sopan Baug", "Spine Road", "Subhash Nagar", "Sukh Sagar Nagar", "Sun City", "Sus", "Sus Gaon", "Swargate",
  "Talawade", "Talegaon Dabhade", "Taljai", "Tadiwala Road", "Tathawade", "Thergaon", "Theur", "Thite Nagar", "Tilak Road", "Tingre Nagar", "Transport Nagar", "Tukaram Nagar", "Tulshibaug",
  "Uday Baug", "Undri", "Uruli Devachi", "Uruli Kanchan", "Uttam Nagar",
  "Vadgaon Budruk", "Vadgaon Maval", "Vadgaon Sheri (Wadgaon Sheri)", "Vallabh Nagar", "Vanaz", "Varje", "Veerbhadra Nagar", "Vidyanagar", "Viman Nagar", "Vishal Nagar", "Vishrantwadi", "Vitthalwadi",
  "Wadaki", "Wadebolai", "Wadgaon Budruk", "Wadgaon Sheri", "Wadmukhwadi", "Wagholi", "Wakad", "Wakadewadi", "Walhekarwadi", "Walvekar Nagar", "Wanowrie (Wanwadi)", "Warje", "Warje Malwadi", "Wireless Colony",
  "Yamuna Nagar", "Yavat", "Yerwada", "Yewalewadi"
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
  {
    name: "Priya Sharma",
    service: "Home Deep Cleaning",
    rating: 5,
    date: "Jul 2025",
    text: "Absolutely amazing service! My 3BHK was cleaned spotlessly. The team was professional, punctual, and used eco-friendly products. Will definitely book again!",
  },
  {
    name: "Rahul Mehta",
    service: "Office Cleaning",
    rating: 5,
    date: "Jun 2025",
    text: "Royal Cleaning transformed our office space completely. The team was thorough, efficient, and very professional. Our entire office is sparkling clean!",
  },
  {
    name: "Anita Desai",
    service: "Sofa Cleaning",
    rating: 5,
    date: "Jun 2025",
    text: "My sofa looks brand new! All the stubborn stains were removed and it smells wonderful. Great value for money and very professional team.",
  },
  {
    name: "Suresh Patil",
    service: "Kitchen Deep Cleaning",
    rating: 5,
    date: "May 2025",
    text: "The kitchen looks brand new! Every corner was cleaned thoroughly. The team worked efficiently and left no mess. Highly recommended!",
  },
  {
    name: "Meera Joshi",
    service: "Move-In Cleaning",
    rating: 5,
    date: "May 2025",
    text: "We moved into a perfectly clean home thanks to Royal Cleaning Services. Every nook and corner was spotless. Amazing attention to detail!",
  },
  {
    name: "Amit Kumar",
    service: "Bathroom Deep Cleaning",
    rating: 4,
    date: "Apr 2025",
    text: "Very impressed with the bathroom cleaning. The tiles look sparkling clean and the limescale is completely gone. Very professional team!",
  },
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
    before: "https://images.unsplash.com/photo-1547414857-c9f61632b250?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
    after: "https://images.pexels.com/photos/9462766/pexels-photo-9462766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
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
