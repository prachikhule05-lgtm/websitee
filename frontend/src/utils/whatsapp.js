export const WHATSAPP_NUMBER = "917498026390";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DEFAULT_WHATSAPP_MESSAGE = "Hello Royal Cleaning Services, I would like to book a cleaning service.";
export const INSTAGRAM_URL = "https://www.instagram.com/royal_cleaning_and_services?igsh=MTljcjc5Z25nbjd4aQ==";
export const PHONE_NUMBER = "+91 74980 26390";
export const PHONE_URL = "tel:+917498026390";

export const getWhatsAppLink = (message = DEFAULT_WHATSAPP_MESSAGE) => {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
};

export const getBookingWhatsAppMessage = (booking) => {
  const addressParts = [booking.houseNo, booking.street, booking.landmark].filter(Boolean).join(", ");
  const cityParts = [booking.area, booking.city || "Pune"].filter(Boolean).join(", ");
  const total = booking.finalTotal || booking.grandTotal || booking.expectedPrice || 0;

  // Normalize phone number
  const phone = booking.mobile
    ? `+91${String(booking.mobile).replace(/^(\+91|91|0)/, "")}`
    : "";

  return `🌟 *NEW BOOKING REQUEST - Royal Cleaning* 🌟
📋 *Booking ID:* ${booking.bookingId || "N/A"}
🧹 *Service:* ${booking.service || ""}
🏠 *Property:* ${booking.propertyType || ""}
📅 *Date:* ${booking.date || ""}
⏰ *Time:* ${booking.time || ""}
👤 *Customer Details*
Name: ${booking.customerName || ""}
Phone: ${phone}
Email: ${booking.email || ""}
📍 *Address*
${addressParts ? addressParts + "\n" : ""}${cityParts}
💳 *Payment*
Pay After Service (CASH)
💰 *Total Amount: ₹${Number(total).toLocaleString("en-IN")}*
✅ Please confirm this slot. Thank you!`;
};
