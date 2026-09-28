import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Instagram } from "lucide-react";
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
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100"
          : "bg-white/90 backdrop-blur-md border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" data-testid={HEADER.logo} className="flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
              <img
                src="/site-logo/refined-logo.png"
                alt="Royal Cleaning Services"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
            <div className="leading-tight ml-1">
              <div className="font-heading font-extrabold text-base leading-none text-[#0B2545]">
                Royal Cleaning
              </div>
              <div className="font-body text-[10px] tracking-widest uppercase leading-none mt-1 text-[#0B2545] font-bold">
                Services
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path || link.sectionId || link.label}
                onClick={() => handleNavClick(link)}
                className={`px-3.5 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200
                  ${
                    isActive(link)
                      ? "text-[#0B2545] bg-green-50 font-semibold"
                      : "text-[#1E293B] hover:text-[#0B2545] hover:bg-green-50/60"
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
              className="p-2 rounded-lg text-[#E1306C] hover:bg-pink-50 transition-all hover:scale-110"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={PHONE_URL}
              data-testid={HEADER.callBtn}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-body text-sm font-semibold text-[#0B2545] bg-green-50/80 hover:bg-green-100 border border-green-200 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:block">{PHONE_NUMBER}</span>
            </a>
            <Link
              to="/booking"
              data-testid={HEADER.bookNowBtn}
              className="bg-[#166534] text-white px-5 py-2.5 rounded-full font-body font-bold text-sm hover:bg-[#14532d] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            data-testid={HEADER.mobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-[#0B2545] hover:bg-gray-100 transition-colors"
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
                  key={link.path || link.sectionId || link.label}
                  onClick={() => handleNavClick(link)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-body font-medium text-sm transition-all
                    ${
                      isActive(link)
                        ? "text-[#0B2545] bg-green-50 font-semibold"
                        : "text-[#1E293B] hover:text-[#0B2545] hover:bg-green-50"
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={PHONE_URL}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 text-[#0B2545] font-semibold text-sm"
                >
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
                <Link
                  to="/booking"
                  className="bg-[#166534] text-white px-4 py-3 rounded-xl font-bold text-sm text-center block shadow-md hover:bg-[#14532d]"
                >
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
