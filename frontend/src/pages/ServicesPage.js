import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Clock, ArrowRight, X, Check, Star, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const categories = ["All", "Residential", "Commercial"];

const HorizontalServiceCard = ({ service, index }) => {
  const isCustom = service.priceType === "custom";

  return (
    <motion.div
      data-testid={SERVICES.serviceCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all group card-hover flex"
    >
      {/* Image - left side */}
      <div className="relative w-44 sm:w-52 flex-shrink-0 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        {service.isMostPopular && (
          <div className="absolute top-3 left-3 badge-popular">Popular</div>
        )}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1 flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#1E293B]" />
          <span className="font-body text-[10px] font-medium text-[#1E293B]">{service.duration}</span>
        </div>
      </div>

      {/* Content - right side */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-heading font-bold text-[#0F172A] text-base leading-tight">{service.name}</h3>
              <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                service.category === "commercial" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-[#2563EB]"
              }`}>
                {service.category === "commercial" ? "Commercial" : "Residential"}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-body text-[10px] text-[#94A3B8] uppercase tracking-wide">Starting</div>
              <div className="font-heading font-extrabold text-lg text-[#2563EB] leading-tight">
                {isCustom ? "Custom" : `₹${service.startingPrice?.toLocaleString("en-IN")}`}
              </div>
              {service.priceType === "per_seat" && (
                <span className="font-body text-[10px] text-[#94A3B8]">/seat</span>
              )}
              {service.priceType === "per_bathroom" && (
                <span className="font-body text-[10px] text-[#94A3B8]">/bathroom</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-xs text-[#1E293B] leading-relaxed mb-3 line-clamp-2">
            {service.description}
          </p>

          {/* Features - horizontal chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(service.features || []).slice(0, 3).map((f, fi) => (
              <div key={fi} className="flex items-center gap-1 bg-[#F8FAFC] rounded-full px-2.5 py-1 border border-gray-100">
                <Check className="w-2.5 h-2.5 text-[#10B981] flex-shrink-0" />
                <span className="font-body text-[10px] text-[#1E293B]">{f}</span>
              </div>
            ))}
            {(service.features || []).length > 3 && (
              <div className="bg-[#F8FAFC] rounded-full px-2.5 py-1 border border-gray-100">
                <span className="font-body text-[10px] text-[#94A3B8]">+{service.features.length - 3} more</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row - rating + book button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-body text-[11px] text-[#1E293B] font-semibold">4.9</span>
            <span className="font-body text-[11px] text-[#94A3B8]">(100+ reviews)</span>
          </div>
          <Link
            to={`/booking?service=${service.slug}`}
            data-testid={SERVICES.bookBtn}
            className="btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2.5 rounded-xl font-body font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            Book Now <ChevronRight className="w-3.5 h-3.5" />
          </Link>
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
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2"
            >
              What We Offer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4"
            >
              Our Cleaning Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="font-body text-base text-slate-300 max-w-xl mx-auto mb-8"
            >
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
                className="w-full bg-white rounded-2xl pl-12 pr-10 py-4 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] shadow-lg"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Filter + Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm font-semibold transition-all border ${
                  category === cat
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-blue"
                    : "bg-white text-[#1E293B] border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {cat}
              </button>
            ))}
            {(search || category !== "All") && (
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="flex items-center gap-1 px-4 py-2 rounded-full font-body text-xs text-[#F59E0B] border border-amber-200 hover:bg-amber-50 transition-all"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Results count + sort */}
          <div className="flex items-center justify-between mb-5">
            <p className="font-body text-sm text-[#94A3B8]">
              {loading ? "Loading..." : `${filtered.length} service${filtered.length !== 1 ? "s" : ""} found`}
            </p>
            <div className="flex items-center gap-2 font-body text-xs text-[#94A3B8]">
              <span className="hidden sm:inline">Sorted by:</span>
              <span className="font-semibold text-[#1E293B]">Most Popular</span>
            </div>
          </div>

          {/* Horizontal service cards */}
          <div className="flex flex-col gap-4">
            {filtered.map((service, i) => (
              <HorizontalServiceCard
                key={service.id || service.slug}
                service={service}
                index={i}
              />
            ))}
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#94A3B8]" />
              </div>
              <p className="font-heading text-xl font-bold text-[#0F172A] mb-2">No services found</p>
              <p className="font-body text-sm text-[#1E293B]">Try a different search or category</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-4 bg-[#2563EB] text-white px-6 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-[#1D4ED8] transition-all"
              >
                View All Services
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] rounded-3xl p-8 text-center"
            >
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="font-body text-slate-300 text-sm mb-5">
                Contact us for a custom cleaning quote tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/booking"
                  className="btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-body font-bold text-sm inline-flex items-center gap-2 transition-all justify-center"
                >
                  Book Any Service <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-white/20 transition-all justify-center inline-flex items-center gap-2"
                >
                  Get Custom Quote
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
