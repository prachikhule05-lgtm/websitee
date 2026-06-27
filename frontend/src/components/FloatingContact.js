import React from "react";
import { motion } from "framer-motion";
import { Phone, Instagram } from "lucide-react";
import { INSTAGRAM_URL, PHONE_URL, JUSTDIAL_URL, getWhatsAppLink } from "@/utils/whatsapp";
import { Link } from "react-router-dom";
import { FLOATING } from "@/constants/testIds";

const FloatingContact = () => {
  return (
    <>
      {/* Desktop: Left floating sidebar */}
      <div className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {[
          {
            href: INSTAGRAM_URL, label: "Instagram", target: "_blank",
            className: "bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] hover:scale-110",
            testId: FLOATING.instagramBtn,
            icon: <Instagram className="w-5 h-5 text-white" />
          },
          {
            href: PHONE_URL, label: "Call", target: "_self",
            className: "bg-[#2563EB] hover:scale-110 btn-blue-glow",
            testId: FLOATING.callBtn,
            icon: <Phone className="w-5 h-5 text-white" />
          },
          {
            href: getWhatsAppLink(), label: "WhatsApp", target: "_blank",
            className: "bg-[#25D366] hover:scale-110 animate-pulse-glow-green",
            testId: FLOATING.whatsappBtn,
            icon: <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          },
          {
            href: JUSTDIAL_URL, label: "JustDial", target: "_blank",
            className: "bg-[#FF6B00] hover:scale-110",
            testId: "floating-justdial-btn",
            icon: <span className="text-white font-extrabold text-sm leading-none">JD</span>
          },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            data-testid={item.testId}
            aria-label={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 ${item.className}`}
            title={item.label}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>

      {/* Mobile: Sticky bottom bar — Call | WhatsApp | JustDial | Book Now */}
      <div
        data-testid={FLOATING.mobileBar}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-pb"
      >
        <div className="flex items-center divide-x divide-gray-100">
          <a
            href={PHONE_URL}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[#2563EB] hover:bg-blue-50 active:bg-blue-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-body font-semibold">Call</span>
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[#25D366] hover:bg-green-50 active:bg-green-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <span className="text-[10px] font-body font-semibold">WhatsApp</span>
          </a>
          <a
            href={JUSTDIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[#FF6B00] hover:bg-orange-50 active:bg-orange-50 transition-colors"
          >
            <span className="font-extrabold text-base leading-none text-[#FF6B00]">JD</span>
            <span className="text-[10px] font-body font-semibold">JustDial</span>
          </a>
          <Link
            to="/booking"
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 bg-[#F59E0B] text-white hover:bg-[#D97706] active:bg-[#D97706] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 2h8l2 5H6L8 2z"/><path d="M3 7h18l-1.5 9a2 2 0 01-2 1.7H6.5a2 2 0 01-2-1.7L3 7z"/><circle cx="9" cy="20" r="1"/><circle cx="15" cy="20" r="1"/></svg>
            <span className="text-[10px] font-body font-bold">Book Now</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FloatingContact;
