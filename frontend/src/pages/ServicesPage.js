import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, X, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Residential", "Commercial"];

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
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || s.category === category.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-sm font-semibold text-[#F97316] uppercase tracking-widest mb-2">
              What We Offer
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Our Cleaning Services
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="font-body text-base text-slate-300 max-w-xl mx-auto mb-8">
              Professional cleaning for homes, offices, and commercial spaces across Pune.
            </motion.p>
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="max-w-lg mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input
                data-testid={SERVICES.searchInput}
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white rounded-2xl pl-12 pr-10 py-4 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] shadow-lg"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Filter + Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Category filter */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all border ${
                  category === cat
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-blue"
                    : "bg-white text-[#475569] border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {cat}
              </button>
            ))}
            {(search || category !== "All") && (
              <button onClick={() => { setSearch(""); setCategory("All"); }}
                className="flex items-center gap-1 px-4 py-2 rounded-full font-body text-xs text-[#F97316] border border-orange-200 hover:bg-orange-50 transition-all">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="font-body text-sm text-[#94A3B8] mb-6">
            {loading ? "Loading..." : `Showing ${filtered.length} service${filtered.length !== 1 ? "s" : ""}`}
          </p>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => {
              const isCustom = service.priceType === "custom";
              return (
                <motion.div
                  key={service.id || service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={SERVICES.serviceCard}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all group card-hover"
                >
                  <div className="relative" style={{ height: "200px" }}>
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {service.isMostPopular && <div className="absolute top-3 right-3 badge-popular">Popular</div>}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#475569]" />
                        <span className="font-body text-xs text-[#475569]">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-bold text-[#0F172A] text-base leading-tight">{service.name}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${service.category === "commercial" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-[#2563EB]"}`}>
                        {service.category === "commercial" ? "Commercial" : "Home"}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#475569] mb-4 leading-relaxed line-clamp-2">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1 mb-4">
                      {(service.features || []).slice(0, 4).map((f, fi) => (
                        <div key={fi} className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#22C55E] flex-shrink-0" />
                          <span className="font-body text-[11px] text-[#475569] leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <div className="font-body text-[10px] text-[#94A3B8] uppercase tracking-wide">Starting from</div>
                        <div className="font-heading font-extrabold text-xl text-[#2563EB]">
                          {isCustom ? "Custom" : `₹${service.startingPrice?.toLocaleString("en-IN") || "0"}`}
                          {service.priceType === "per_seat" && <span className="font-body text-xs text-[#94A3B8] font-normal ml-0.5">/seat</span>}
                          {service.priceType === "per_bathroom" && <span className="font-body text-xs text-[#94A3B8] font-normal ml-0.5">/bathroom</span>}
                        </div>
                      </div>
                      <Link
                        to={`/booking?service=${service.slug}`}
                        data-testid={SERVICES.bookBtn}
                        className="btn-orange-glow bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-xl font-body font-bold text-xs flex items-center gap-1.5 transition-all"
                      >
                        Book Now <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="font-heading text-xl font-bold text-[#0F172A] mb-2">No services found</p>
              <p className="font-body text-sm text-[#475569]">Try a different search term or category</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
