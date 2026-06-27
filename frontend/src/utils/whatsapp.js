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
  return `Hello Royal Cleaning Services, I have booked ${booking.service} service. Booking ID: ${booking.bookingId}. Date: ${booking.date} at ${booking.time}. Please confirm.`;
};
