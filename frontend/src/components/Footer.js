import React from "react";
import { Link } from "react-router-dom";
import { Phone, Instagram, MapPin, Mail, Crown, ArrowRight } from "lucide-react";
import { INSTAGRAM_URL, PHONE_URL, PHONE_NUMBER, getWhatsAppLink } from "@/utils/whatsapp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Home Deep Cleaning", href: "/services" },
    { name: "Office Cleaning", href: "/services" },
    { name: "Sofa Cleaning", href: "/services" },
    { name: "Kitchen Deep Cleaning", href: "/services" },
    { name: "Bathroom Cleaning", href: "/services" },
    { name: "Commercial Cleaning", href: "/services" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Book Now", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ];

  const seoLinks = [
    { name: "Home Cleaning Pune", href: "/home-cleaning-pune" },
    { name: "Sofa Cleaning Pune", href: "/sofa-cleaning-pune" },
    { name: "Kitchen Cleaning Pune", href: "/kitchen-cleaning-pune" },
    { name: "Bathroom Cleaning Pune", href: "/bathroom-cleaning-pune" },
    { name: "Office Cleaning Pune", href: "/office-cleaning-pune" },
    { name: "Commercial Cleaning Pune", href: "/commercial-cleaning-pune" },
  ];

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">Ready for a Spotless Home?</h3>
            <p className="text-blue-100 mt-1 font-body text-sm">Book now & pay after service. No advance needed.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/booking"
              className="btn-orange-glow bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-full font-bold font-body text-sm flex items-center gap-2 transition-all"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-full font-bold font-body text-sm flex items-center gap-2 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#F97316] rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-base text-white leading-none">Royal Cleaning</div>
                <div className="font-body text-[10px] text-[#F97316] tracking-widest uppercase">Services</div>
              </div>
            </div>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-5">
              Pune's most trusted professional cleaning service. Making your spaces spotless since 2019.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <a href={PHONE_URL} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <a href="mailto:royalcleaning.pune@gmail.com" className="hover:text-white transition-colors">royalcleaning.pune@gmail.com</a>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                <span>Serving all areas across Pune, Maharashtra</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#833AB4] to-[#E1306C] flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href={PHONE_URL}
                className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link to={s.href} className="font-body text-sm text-slate-400 hover:text-[#F97316] transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F97316] flex-shrink-0" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="font-body text-sm text-slate-400 hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#2563EB] flex-shrink-0" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Local SEO Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Cleaning in Pune</h4>
            <ul className="space-y-2.5">
              {seoLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="font-body text-sm text-slate-400 hover:text-[#22C55E] transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#22C55E] flex-shrink-0" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-slate-500">
            &copy; {currentYear} Royal Cleaning Services, Pune. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-slate-500">GST Reg. No.: 27XXXXX</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="font-body text-xs text-slate-500">ISO Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
