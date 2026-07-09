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
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
    >
      {/* Image */}
      <div className="relative md:w-72 h-56 md:h-auto overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {service.isMostPopular && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Most Popular
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-full px-3 py-1 flex items-center gap-2 shadow">
          <Clock className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-semibold text-slate-700">
            {service.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Top */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {service.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    service.category === "commercial"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {service.category === "commercial"
                    ? "Commercial"
                    : "Residential"}
                </span>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">4.9</span>
                  <span className="text-sm text-slate-500">
                    (100+ reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Starting From
              </p>

              <h2 className="text-3xl font-black text-blue-600">
                {isCustom
                  ? "Custom Quote"
                  : `₹${service.startingPrice.toLocaleString("en-IN")}`}
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 mt-4 leading-7">
            {service.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {service.features?.slice(0, 4).map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2"
              >
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-6 pt-5 border-t">
          <div>
            <p className="text-sm text-slate-500">
              ✔ Professional Equipment
            </p>
            <p className="text-sm text-slate-500">
              ✔ Verified Experts
            </p>
          </div>

          <Link
            to={`/booking?service=${service.slug}`}
            data-testid={SERVICES.bookBtn}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg"
          >
            Book Now →
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-3 mb-6 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
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
          <div className="flex flex-col gap-5">
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
