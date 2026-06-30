import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Zap, Star } from "lucide-react";
import api from "@/utils/api";
import { SERVICES_STATIC } from "@/constants/data";
import { SERVICES } from "@/constants/testIds";

const ServiceCard = ({ service, index }) => {
  const isCustom = service.priceType === "custom";
  return (
    <motion.div
      data-testid={SERVICES.serviceCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all group card-hover"
    >
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {service.isMostPopular && (
          <div className="absolute top-3 right-3 badge-popular">Popular</div>
        )}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#1E293B]" />
          <span className="font-body text-xs font-medium text-[#1E293B]">{service.duration}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-[#0F172A] text-base mb-1.5 leading-tight">{service.name}</h3>
        <p className="font-body text-xs text-[#1E293B] leading-relaxed mb-3 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-[10px] text-[#94A3B8] uppercase tracking-wide">Starting from</div>
            <div className="font-heading font-extrabold text-lg text-[#2563EB]">
              {isCustom ? "Custom Quote" : `₹${service.startingPrice.toLocaleString("en-IN")}`}
              {service.priceType === "per_seat" && <span className="font-body text-xs text-[#94A3B8] font-normal">/seat</span>}
              {service.priceType === "per_bathroom" && <span className="font-body text-xs text-[#94A3B8] font-normal">/bathroom</span>}
            </div>
          </div>
          <Link
            to={`/booking?service=${service.slug}`}
            data-testid={SERVICES.bookBtn}
            className="btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-2 rounded-xl font-body font-bold text-xs flex items-center gap-1 transition-all"
          >
            Book <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesOverview = () => {
  const [services, setServices] = useState(SERVICES_STATIC.slice(0, 6));
  console.log("=== NEW BUILD ===");
  console.log("services =", services);
  console.log("isArray =", Array.isArray(services));

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");

        console.log("API Response:", response.data);

        let servicesData = [];

        // Case 1: API returns an array
        if (Array.isArray(response.data)) {
          servicesData = response.data;
        }
        // Case 2: API returns { services: [...] }
        else if (Array.isArray(response.data?.services)) {
          servicesData = response.data.services;
        }
        // Case 3: API returns { data: [...] }
        else if (Array.isArray(response.data?.data)) {
          servicesData = response.data.data;
        }
        // Unknown response
        else {
          console.error("Unexpected API response:", response.data);
          servicesData = SERVICES_STATIC;
        }

        setServices(servicesData.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch services:", error);

        // Keep static services if API fails
        setServices(SERVICES_STATIC.slice(0, 6));
      }
    };

    fetchServices();
  }, []);

  console.log("Services:", services);
  console.log("Is Array:", Array.isArray(services));

  return (
    <section className="py-20 bg-[#F8FAFC]" data-testid={SERVICES.section}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <p className="font-body text-sm font-semibold text-[#F59E0B] uppercase tracking-widest mb-2">
              What We Offer
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A]">
              Our Cleaning Services
            </h2>

            <p className="font-body text-base text-[#1E293B] mt-2">
              Professional cleaning for every space in Pune
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] group"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(services) &&
            services.map((service, i) => (
              <ServiceCard
                key={service.id || service.slug || i}
                service={service}
                index={i}
              />
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold font-body text-base transition-all"
          >
            <Zap className="w-5 h-5" />
            Book Any Service Now
          </Link>

          <p className="font-body text-sm text-[#94A3B8] mt-3">
            Pay only after service is completed. No advance needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
