import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Instagram, Crown } from "lucide-react";
import { INSTAGRAM_URL, PHONE_URL, PHONE_NUMBER } from "@/utils/whatsapp";
import { HEADER } from "@/constants/testIds";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Reviews", sectionId: "reviews" },
  { label: "Our Trusted Clients", sectionId: "trusted-clients" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const handleNavClick = (link) => {
    setMobileOpen(false);
    if (link.sectionId) {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: link.sectionId } });
      } else {
        scrollToSection(link.sectionId);
      }
      return;
    }
    if (link.path === location.pathname) {
      if (link.path === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(link.path);
  };

  const isActive = (link) => link.path && location.pathname === link.path;

  return (
    <header
      data-testid={HEADER.nav}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button onClick={() => handleNavClick({ path: "/" })} data-testid={HEADER.logo} className="flex items-center gap-3 group focus:outline-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center justify-center">
              <img
                 src="/site-logo/cleaning.png"
                 alt="Royal Cleaning Services"
                 className="w-full h-full object-contain"
               />
            </div>
            <div className="leading-tight text-left">
              <div className={`font-heading font-extrabold text-base leading-none ${scrolled ? "text-[#0F172A]" : "text-white"}`}>
                Royal Cleaning
              </div>
              <div className={`font-body text-[10px] tracking-widest uppercase leading-none mt-0.5 ${scrolled ? "text-[#F59E0B]" : "text-[#F59E0B]"}`}>
                Services
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`px-3.5 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                  isActive(link)
                    ? "text-[#2563EB] bg-blue-50 font-semibold"
                    : scrolled
                    ? "text-[#1E293B] hover:text-[#2563EB] hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all hover:scale-110 ${scrolled ? "text-[#E1306C] hover:bg-pink-50" : "text-white hover:bg-white/10"}`}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={PHONE_URL}
              data-testid={HEADER.callBtn}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-body text-sm font-semibold transition-all
                ${scrolled ? "text-[#2563EB] hover:bg-blue-50 border border-blue-200" : "text-white hover:bg-white/10 border border-white/30"}`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:block">{PHONE_NUMBER}</span>
            </a>
            <Link
              to="/booking"
              data-testid={HEADER.bookNowBtn}
              className="btn-orange-glow bg-[#F59E0B] text-white px-5 py-2.5 rounded-full font-body font-bold text-sm hover:bg-[#D97706] transition-all duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            data-testid={HEADER.mobileMenuToggle}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#0F172A] hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid={HEADER.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className={`w-full text-left block px-4 py-3 rounded-xl font-body font-medium text-sm transition-all ${
                    isActive(link) ? "text-[#2563EB] bg-blue-50 font-semibold" : "text-[#1E293B] hover:text-[#2563EB] hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href={PHONE_URL} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 text-[#2563EB] font-semibold text-sm">
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
                <Link to="/booking" className="btn-orange-glow bg-[#F59E0B] text-white px-4 py-3 rounded-xl font-bold text-sm text-center block">
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
