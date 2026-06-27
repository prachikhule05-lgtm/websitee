import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check, ChevronRight, ChevronLeft, MapPin, Calendar, Clock, User, Home, FileText, Search, Plus, Minus, Sofa } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api, { formatApiError } from "@/utils/api";
import { SERVICES_STATIC, PROPERTY_TYPES, PUNE_AREAS, TIME_SLOTS, calculatePrice } from "@/constants/data";
import { BOOKING } from "@/constants/testIds";

const STEPS = [
  { id: 1, label: "Service", icon: <Home className="w-4 h-4" /> },
  { id: 2, label: "Add-ons", icon: <Plus className="w-4 h-4" /> },
  { id: 3, label: "Property", icon: <Home className="w-4 h-4" /> },
  { id: 4, label: "Location", icon: <MapPin className="w-4 h-4" /> },
  { id: 5, label: "Date", icon: <Calendar className="w-4 h-4" /> },
  { id: 6, label: "Time", icon: <Clock className="w-4 h-4" /> },
  { id: 7, label: "Details", icon: <User className="w-4 h-4" /> },
  { id: 8, label: "Address", icon: <MapPin className="w-4 h-4" /> },
  { id: 9, label: "Summary", icon: <FileText className="w-4 h-4" /> },
];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [services, setServices] = useState(SERVICES_STATIC);
  const [loading, setLoading] = useState(false);
  const [areaSearch, setAreaSearch] = useState("");
  const [showAreaList, setShowAreaList] = useState(false);

  const [booking, setBooking] = useState({
    service: "", serviceId: "", serviceObj: null,
    hasSofa: null, sofaCleaningType: "none", sofaSeats: 1, chairCount: 0,
    propertyType: "", location: "", date: "", time: "",
    customerName: "", mobile: "", email: "",
    houseNo: "", street: "", landmark: "", area: "", city: "Pune", pincode: "",
  });

  useEffect(() => {
    api.get("/services").then(r => { if (r.data?.length) setServices(r.data); }).catch(() => {});
    const slug = searchParams.get("service");
    if (slug) {
      const found = SERVICES_STATIC.find(s => s.slug === slug);
      if (found) setBooking(b => ({ ...b, service: found.name, serviceId: found.id || found.slug, serviceObj: found }));
    }
  }, []);

  const SOFA_WET_PRICE = 499;
  const CHAIR_PRICE = 150;

  const pricing = booking.serviceObj && booking.propertyType
    ? calculatePrice(booking.serviceObj, booking.propertyType)
    : { base: 0, gst: 0, total: 0, isCustom: false };

  const addonBase =
    (booking.sofaCleaningType === "wet" ? booking.sofaSeats * SOFA_WET_PRICE : 0) +
    (booking.chairCount * CHAIR_PRICE);
  const addonGst = Math.round(addonBase * 0.18);
  const addonTotal = addonBase + addonGst;
  const grandTotal = pricing.total + addonTotal;

  const today = new Date().toISOString().split("T")[0];

  const go = (dir2) => {
    setDir(dir2);
    setStep(s => Math.max(1, Math.min(9, s + dir2)));
  };

  const canNext = () => {
    if (step === 1) return !!booking.service;
    if (step === 2) return booking.hasSofa !== null;
    if (step === 3) return !!booking.propertyType;
    if (step === 4) return !!booking.location;
    if (step === 5) return !!booking.date;
    if (step === 6) return !!booking.time;
    if (step === 7) return booking.customerName && booking.mobile && booking.mobile.length >= 10;
    if (step === 8) return booking.houseNo && booking.street && booking.area && booking.pincode;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        service: booking.service, serviceId: booking.serviceId || "",
        propertyType: booking.propertyType, location: booking.location,
        date: booking.date, time: booking.time,
        customerName: booking.customerName, mobile: booking.mobile, email: booking.email,
        houseNo: booking.houseNo, street: booking.street, landmark: booking.landmark,
        area: booking.area, city: booking.city, pincode: booking.pincode,
        expectedPrice: pricing.base, gst: pricing.gst, grandTotal: pricing.total,
        addons: {
          sofaCleaning: booking.sofaCleaningType !== "none" ? { type: booking.sofaCleaningType, seats: booking.sofaSeats } : null,
          chairCleaning: booking.chairCount > 0 ? { count: booking.chairCount, pricePerChair: CHAIR_PRICE } : null,
          addonBase, addonGst, addonTotal,
        },
        finalTotal: grandTotal,
      };
      const r = await api.post("/bookings", payload);
      toast.success("Booking confirmed!");
      navigate("/booking/success", { state: { booking: { ...payload, bookingId: r.data.bookingId, ...r.data } } });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredAreas = PUNE_AREAS.filter(a => a.toLowerCase().includes(areaSearch.toLowerCase()));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] pt-28 pb-10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-2">Book a Cleaning Service</h1>
            <p className="font-body text-slate-400 text-sm">Complete in minutes. Pay only after service.</p>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div data-testid={BOOKING.stepIndicator} className="flex items-center gap-1 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div
                  className={`flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer ${s.id <= step ? "opacity-100" : "opacity-40"}`}
                  onClick={() => { if (s.id < step) { setDir(-1); setStep(s.id); } }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${s.id < step ? "step-completed" : s.id === step ? "step-active" : "step-inactive"}`}>
                    {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className={`font-body text-[10px] ${s.id === step ? "text-[#2563EB] font-semibold" : "text-[#94A3B8]"}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-colors min-w-[12px] ${s.id < step ? "bg-[#10B981]" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full mt-3">
            <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#F59E0B] rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto px-4">
          <div data-testid={BOOKING.form} className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-100 min-h-[400px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Service */}
                {step === 1 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Select Service</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Choose the cleaning service you need</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {services.map(s => (
                        <button
                          key={s.id || s.slug}
                          data-testid={BOOKING.serviceSelect}
                          onClick={() => setBooking(b => ({ ...b, service: s.name, serviceId: s.id || s.slug, serviceObj: s }))}
                          className={`p-4 rounded-2xl border-2 text-left transition-all group ${
                            booking.service === s.name
                              ? "border-[#2563EB] bg-blue-50 shadow-blue"
                              : "border-gray-100 hover:border-[#2563EB] hover:bg-blue-50"
                          }`}
                        >
                          <div className="relative w-full h-20 rounded-xl overflow-hidden mb-3">
                            <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            {booking.service === s.name && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="font-heading font-bold text-xs text-[#0F172A] leading-tight mb-1">{s.name}</div>
                          <div className="font-body text-[10px] text-[#2563EB] font-semibold">
                            {s.priceType === "custom" ? "Custom Quote" : `From ₹${s.startingPrice?.toLocaleString("en-IN")}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Add-on Services */}
                {step === 2 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Add-on Services</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Enhance your booking with optional extras</p>

                    {/* Sofa Question */}
                    <div className="mb-6 p-5 bg-[#F8FAFC] rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Sofa className="w-4 h-4 text-[#2563EB]" />
                        </div>
                        <h3 className="font-heading font-bold text-base text-[#0F172A]">Do you have a sofa or furnished flat?</h3>
                      </div>
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => setBooking(b => ({ ...b, hasSofa: true }))}
                          className={`flex-1 py-3 rounded-xl border-2 font-body font-bold text-sm transition-all ${booking.hasSofa === true ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-gray-200 text-[#1E293B] hover:border-[#2563EB]"}`}
                        >Yes, I do</button>
                        <button
                          onClick={() => setBooking(b => ({ ...b, hasSofa: false, sofaCleaningType: "none", sofaSeats: 1 }))}
                          className={`flex-1 py-3 rounded-xl border-2 font-body font-bold text-sm transition-all ${booking.hasSofa === false ? "border-[#94A3B8] bg-gray-50 text-[#1E293B]" : "border-gray-200 text-[#1E293B] hover:border-gray-400"}`}
                        >No, skip</button>
                      </div>

                      {booking.hasSofa === true && (
                        <div className="space-y-3">
                          <p className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide">Sofa cleaning type:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { key: "dry", label: "Dry Cleaning", sub: "Included" },
                              { key: "wet", label: "Wet Cleaning", sub: "₹499/seat" },
                              { key: "none", label: "Skip", sub: "No cleaning" },
                            ].map(opt => (
                              <button
                                key={opt.key}
                                onClick={() => setBooking(b => ({ ...b, sofaCleaningType: opt.key }))}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${booking.sofaCleaningType === opt.key ? "border-[#F59E0B] bg-amber-50" : "border-gray-100 hover:border-[#F59E0B]"}`}
                              >
                                <div className="font-heading font-bold text-xs text-[#0F172A]">{opt.label}</div>
                                <div className={`font-body text-[10px] mt-0.5 ${opt.key === "wet" ? "text-[#2563EB] font-semibold" : "text-[#94A3B8]"}`}>{opt.sub}</div>
                              </button>
                            ))}
                          </div>

                          {booking.sofaCleaningType === "wet" && (
                            <div className="mt-3 flex items-center gap-4 bg-blue-50 rounded-xl p-4">
                              <span className="font-body text-sm font-semibold text-[#0F172A] flex-1">Number of sofa seats:</span>
                              <div className="flex items-center gap-3">
                                <button onClick={() => setBooking(b => ({ ...b, sofaSeats: Math.max(1, b.sofaSeats - 1) }))}
                                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#2563EB] transition-all">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-heading font-extrabold text-xl text-[#2563EB] w-6 text-center">{booking.sofaSeats}</span>
                                <button onClick={() => setBooking(b => ({ ...b, sofaSeats: b.sofaSeats + 1 }))}
                                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#2563EB] transition-all">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-heading font-bold text-[#2563EB] text-sm">₹{(booking.sofaSeats * 499).toLocaleString("en-IN")}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Chair Cleaning */}
                    <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-gray-100 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                            <User className="w-4 h-4 text-[#F59E0B]" />
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-base text-[#0F172A]">Chair Cleaning</h3>
                            <p className="font-body text-xs text-[#94A3B8]">₹150 per chair</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setBooking(b => ({ ...b, chairCount: Math.max(0, b.chairCount - 1) }))}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#F59E0B] transition-all">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-heading font-extrabold text-xl text-[#0F172A] w-6 text-center">{booking.chairCount}</span>
                          <button onClick={() => setBooking(b => ({ ...b, chairCount: b.chairCount + 1 }))}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-[#F59E0B] transition-all">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {booking.chairCount > 0 && (
                        <div className="bg-amber-50 rounded-xl px-4 py-2 flex justify-between">
                          <span className="font-body text-sm text-[#1E293B]">{booking.chairCount} chair{booking.chairCount > 1 ? "s" : ""} × ₹150</span>
                          <span className="font-heading font-bold text-[#F59E0B]">₹{(booking.chairCount * 150).toLocaleString("en-IN")}</span>
                        </div>
                      )}
                    </div>

                    {/* Addon Total */}
                    {addonBase > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex justify-between items-center">
                        <div>
                          <span className="font-body text-sm font-semibold text-[#10B981]">Add-on Total (incl. 18% GST)</span>
                        </div>
                        <span className="font-heading font-extrabold text-lg text-[#10B981]">₹{addonTotal.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    {addonBase === 0 && (
                      <div className="text-center py-3 text-[#94A3B8] font-body text-sm">No add-ons selected — you can skip this step</div>
                    )}
                  </div>
                )}

                {/* Step 3: Property Type */}
                {step === 3 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Select Property Type</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">This helps us estimate the correct price</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PROPERTY_TYPES.map(pt => {
                        const p = booking.serviceObj?.propertyPricing?.[pt] || 0;
                        const isCustom = p === 0;
                        return (
                          <button
                            key={pt}
                            data-testid={BOOKING.propertySelect}
                            onClick={() => setBooking(b => ({ ...b, propertyType: pt }))}
                            className={`p-4 rounded-2xl border-2 text-center transition-all ${
                              booking.propertyType === pt
                                ? "border-[#F59E0B] bg-amber-50"
                                : "border-gray-100 hover:border-[#F59E0B] hover:bg-amber-50"
                            }`}
                          >
                            <div className="font-heading font-bold text-sm text-[#0F172A] mb-1">{pt}</div>
                            <div className={`font-body text-xs font-semibold ${isCustom ? "text-[#94A3B8]" : "text-[#2563EB]"}`}>
                              {isCustom ? "Custom" : `₹${p.toLocaleString("en-IN")}`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {pricing.base > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
                        <p className="font-body text-sm text-[#2563EB]">
                          <strong>Estimated Price:</strong> ₹{pricing.base.toLocaleString("en-IN")} + GST (18%) = <strong>₹{pricing.total.toLocaleString("en-IN")}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Location */}
                {step === 4 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Select Location</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Which area in Pune?</p>
                    <div className="relative mb-4">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input
                        data-testid={BOOKING.locationSelect}
                        type="text"
                        placeholder="Search area..."
                        value={booking.location || areaSearch}
                        onChange={e => {
                          setAreaSearch(e.target.value);
                          setBooking(b => ({ ...b, location: e.target.value }));
                          setShowAreaList(true);
                        }}
                        onFocus={() => setShowAreaList(true)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    {showAreaList && (
                      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm max-h-60 overflow-y-auto">
                        {filteredAreas.map(area => (
                          <button
                            key={area}
                            className={`w-full text-left px-4 py-3 font-body text-sm hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 ${booking.location === area ? "bg-blue-50 text-[#2563EB] font-semibold" : "text-[#0F172A]"}`}
                            onClick={() => { setBooking(b => ({ ...b, location: area })); setAreaSearch(area); setShowAreaList(false); }}
                          >
                            <MapPin className="w-3.5 h-3.5 inline mr-2 text-[#94A3B8]" />{area}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Date */}
                {step === 5 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Select Date</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">When would you like the cleaning?</p>
                    <input
                      data-testid={BOOKING.datePicker}
                      type="date"
                      min={today}
                      value={booking.date}
                      onChange={e => setBooking(b => ({ ...b, date: e.target.value }))}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 font-body text-base focus:outline-none focus:border-[#2563EB] transition-colors"
                    />
                    {booking.date && (
                      <div className="mt-4 p-4 bg-green-50 rounded-2xl flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#10B981]" />
                        <p className="font-body text-sm text-[#10B981] font-semibold">
                          Selected: {new Date(booking.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Time */}
                {step === 6 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Select Time Slot</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Available time slots for your selected date</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          data-testid={BOOKING.timePicker}
                          onClick={() => setBooking(b => ({ ...b, time: slot }))}
                          className={`p-3 rounded-xl border-2 font-body text-sm font-semibold transition-all ${
                            booking.time === slot
                              ? "border-[#2563EB] bg-[#2563EB] text-white shadow-blue"
                              : "border-gray-200 text-[#1E293B] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Customer Details */}
                {step === 7 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Your Details</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">We'll use these to confirm your booking</p>
                    <div className="space-y-4">
                      <div>
                        <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5 block">Full Name *</label>
                        <input data-testid={BOOKING.customerName} type="text" placeholder="Enter your full name"
                          value={booking.customerName} onChange={e => setBooking(b => ({ ...b, customerName: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5 block">Mobile Number *</label>
                        <input data-testid={BOOKING.customerMobile} type="tel" placeholder="+91 XXXXX XXXXX"
                          value={booking.mobile} onChange={e => setBooking(b => ({ ...b, mobile: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5 block">Email (Optional)</label>
                        <input data-testid={BOOKING.customerEmail} type="email" placeholder="you@email.com"
                          value={booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 8: Address */}
                {step === 8 && (
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Service Address</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Where should our team come?</p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">House / Flat No. *</label>
                          <input type="text" placeholder="e.g. 402, B-Wing" value={booking.houseNo}
                            onChange={e => setBooking(b => ({ ...b, houseNo: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                        </div>
                        <div>
                          <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Street / Society *</label>
                          <input type="text" placeholder="Street or society name" value={booking.street}
                            onChange={e => setBooking(b => ({ ...b, street: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Landmark (Optional)</label>
                        <input type="text" placeholder="Near landmark" value={booking.landmark}
                          onChange={e => setBooking(b => ({ ...b, landmark: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Area *</label>
                          <input type="text" placeholder="Area / Locality" value={booking.area}
                            onChange={e => setBooking(b => ({ ...b, area: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                        </div>
                        <div>
                          <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">Pincode *</label>
                          <input type="text" placeholder="411XXX" value={booking.pincode} maxLength={6}
                            onChange={e => setBooking(b => ({ ...b, pincode: e.target.value }))}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB]" />
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1 block">City</label>
                        <input type="text" value={booking.city} readOnly
                          className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 font-body text-sm bg-gray-50 text-[#1E293B]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 9: Summary */}
                {step === 9 && (
                  <div data-testid={BOOKING.summary}>
                    <h2 className="font-heading text-2xl font-bold text-[#0F172A] mb-1">Booking Summary</h2>
                    <p className="font-body text-sm text-[#1E293B] mb-6">Review your booking details before confirming</p>
                    <div className="space-y-3 mb-6">
                      {[
                        { label: "Service", value: booking.service },
                        { label: "Property Type", value: booking.propertyType },
                        { label: "Location", value: booking.location },
                        { label: "Date", value: booking.date ? new Date(booking.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "" },
                        { label: "Time", value: booking.time },
                        { label: "Customer", value: booking.customerName },
                        { label: "Mobile", value: booking.mobile },
                        { label: "Address", value: `${booking.houseNo}, ${booking.street}${booking.landmark ? ", " + booking.landmark : ""}, ${booking.area}, ${booking.city} - ${booking.pincode}` },
                      ].map(item => (
                        <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50">
                          <span className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide flex-shrink-0">{item.label}</span>
                          <span className="font-body text-sm text-[#0F172A] font-medium text-right">{item.value || "—"}</span>
                        </div>
                      ))}
                      {/* Add-on rows */}
                      {booking.sofaCleaningType !== "none" && booking.hasSofa && (
                        <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-50">
                          <span className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Sofa Cleaning</span>
                          <span className="font-body text-sm text-[#0F172A] font-medium text-right">
                            {booking.sofaCleaningType === "wet" ? `Wet - ${booking.sofaSeats} seat(s) × ₹499` : "Dry cleaning"}
                          </span>
                        </div>
                      )}
                      {booking.chairCount > 0 && (
                        <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-50">
                          <span className="font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Chair Cleaning</span>
                          <span className="font-body text-sm text-[#0F172A] font-medium text-right">{booking.chairCount} chair(s) × ₹150</span>
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
                      {pricing.isCustom ? (
                        <div className="text-center py-2">
                          <p className="font-heading font-bold text-[#0F172A]">Custom Quote Service</p>
                          <p className="font-body text-sm text-[#1E293B] mt-1">Our team will contact you with pricing after inspection.</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between mb-2">
                            <span className="font-body text-sm text-[#1E293B]">Service Price</span>
                            <span className="font-body text-sm font-semibold text-[#0F172A]">₹{pricing.base.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="font-body text-sm text-[#1E293B]">GST (18%)</span>
                            <span className="font-body text-sm font-semibold text-[#0F172A]">₹{pricing.gst.toLocaleString("en-IN")}</span>
                          </div>
                          {addonBase > 0 && (
                            <>
                              <div className="flex justify-between mb-2">
                                <span className="font-body text-sm text-[#1E293B]">Add-on Services</span>
                                <span className="font-body text-sm font-semibold text-[#10B981]">₹{addonBase.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex justify-between mb-3 pb-3 border-b border-gray-200">
                                <span className="font-body text-sm text-[#1E293B]">Add-on GST (18%)</span>
                                <span className="font-body text-sm font-semibold text-[#0F172A]">₹{addonGst.toLocaleString("en-IN")}</span>
                              </div>
                            </>
                          )}
                          {addonBase === 0 && <div className="border-b border-gray-200 mb-3" />}
                          <div className="flex justify-between">
                            <span className="font-heading font-bold text-[#0F172A]">Grand Total</span>
                            <span className="font-heading font-extrabold text-xl text-[#2563EB]">₹{grandTotal.toLocaleString("en-IN")}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Payment Note */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        <div>
                          <div className="font-heading font-bold text-sm text-[#10B981]">Pay After Service</div>
                          <div className="font-body text-xs text-[#1E293B]">No advance payment required. Pay only after the cleaning service is completed.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <button data-testid={BOOKING.prevBtn} onClick={() => go(-1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 font-body font-semibold text-sm text-[#1E293B] hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 9 ? (
              <button
                data-testid={BOOKING.nextBtn}
                onClick={() => go(1)}
                disabled={!canNext()}
                className="flex items-center gap-2 btn-orange-glow bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3 rounded-full font-body font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                data-testid={BOOKING.confirmBtn}
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-3 rounded-full font-body font-bold text-sm transition-all disabled:opacity-70 shadow-lg shadow-green-200"
              >
                {loading ? <div className="spinner" /> : <><Check className="w-4 h-4" /> Confirm Booking</>}
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookingPage;
