import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import FloatingContact from "@/components/FloatingContact";

import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import BookingPage from "@/pages/BookingPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";
import GalleryPage from "@/pages/GalleryPage";
import ContactPage from "@/pages/ContactPage";
import LocalSEOPage from "@/pages/LocalSEOPage";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminBookingsPage from "@/pages/admin/AdminBookingsPage";
import AdminServicesPage from "@/pages/admin/AdminServicesPage";
import AdminReviewsPage from "@/pages/admin/AdminReviewsPage";
import AdminGalleryPage from "./pages/admin/AdminGalleryPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/success" element={<BookingSuccessPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Local SEO Routes */}
          <Route path="/home-cleaning-pune" element={<LocalSEOPage service="home-deep-cleaning" />} />
          <Route path="/sofa-cleaning-pune" element={<LocalSEOPage service="sofa-cleaning" />} />
          <Route path="/kitchen-cleaning-pune" element={<LocalSEOPage service="kitchen-cleaning" />} />
          <Route path="/bathroom-cleaning-pune" element={<LocalSEOPage service="bathroom-cleaning" />} />
          <Route path="/office-cleaning-pune" element={<LocalSEOPage service="office-cleaning" />} />
          <Route path="/commercial-cleaning-pune" element={<LocalSEOPage service="commercial-cleaning" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingsPage /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminServicesPage /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FloatingContact />
        <Toaster richColors position="top-right" closeButton />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
