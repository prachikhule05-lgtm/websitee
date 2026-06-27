import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Home, ArrowRight, Calendar, MapPin, Package } from "lucide-react";
import { getBookingWhatsAppMessage, PHONE_URL } from "@/utils/whatsapp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SUCCESS } from "@/constants/testIds";

const BookingSuccessPage = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-[#1E293B]">Booking details not found.</p>
            <Link to="/booking" className="font-body text-[#2563EB] hover:underline mt-2 block">Make a new booking</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const waMsg = getBookingWhatsAppMessage(booking);

  return (
    <>
      <Header />
      <main data-testid={SUCCESS.page} className="min-h-screen bg-[#F8FAFC] pb-16 md:pb-0">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#10B981] to-[#059669] pt-28 pb-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-3xl font-extrabold text-white mb-2"
            >
              Booking Confirmed!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-green-100 text-base"
            >
              Our team will reach out to confirm your appointment.
            </motion.p>
          </div>
        </div>

        {/* Details */}
        <div className="max-w-xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 mb-6"
          >
            {/* Booking ID */}
            <div className="text-center mb-6 pb-6 border-b border-gray-100">
              <p className="font-body text-xs text-[#94A3B8] uppercase tracking-widest mb-1">Booking ID</p>
              <p data-testid={SUCCESS.bookingId} className="font-heading text-3xl font-extrabold text-[#2563EB]">{booking.bookingId}</p>
              <p className="font-body text-xs text-[#94A3B8] mt-1">Save this for your reference</p>
            </div>

            {/* Details grid */}
            <div className="space-y-3">
              {[
                { icon: <Package className="w-4 h-4" />, label: "Service", value: booking.service, color: "text-[#2563EB] bg-blue-50" },
                { icon: <Calendar className="w-4 h-4" />, label: "Date & Time", value: `${booking.date ? new Date(booking.date).toLocaleDateString("en-IN", { weekday: "short", month: "long", day: "numeric" }) : booking.date} at ${booking.time}`, color: "text-[#F59E0B] bg-amber-50" },
                { icon: <Phone className="w-4 h-4" />, label: "Contact", value: booking.customerName ? `${booking.customerName} · ${booking.mobile}` : booking.mobile, color: "text-[#10B981] bg-green-50" },
                { icon: <MapPin className="w-4 h-4" />, label: "Address", value: booking.address || `${booking.houseNo}, ${booking.street}, ${booking.area}, ${booking.city}`, color: "text-purple-600 bg-purple-50" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-body text-[10px] text-[#94A3B8] uppercase tracking-wide">{item.label}</div>
                    <div className="font-body text-sm font-semibold text-[#0F172A] mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            {booking.grandTotal > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-[#94A3B8]">Expected Total</p>
                  <p className="font-heading font-extrabold text-xl text-[#2563EB]">₹{booking.grandTotal?.toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-green-50 text-[#10B981] px-4 py-2 rounded-full font-body font-bold text-sm">
                  Pay After Service
                </div>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            <a
              href={`https://wa.me/917498026390?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={SUCCESS.whatsappBtn}
              className="bg-[#25D366] hover:bg-[#1ebe57] text-white py-4 rounded-2xl font-body font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp Confirmation
            </a>
            <a
              href={PHONE_URL}
              data-testid={SUCCESS.callBtn}
              className="btn-blue-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-2xl font-body font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5" /> Call Royal Cleaning Services
            </a>
            <Link
              to="/"
              data-testid={SUCCESS.homeBtn}
              className="bg-white border-2 border-gray-200 hover:border-[#2563EB] text-[#0F172A] py-4 rounded-2xl font-body font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingSuccessPage;
