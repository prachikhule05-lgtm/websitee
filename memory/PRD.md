# Royal Cleaning Services - PRD

## Original Problem Statement
Build a production-ready, highly polished cleaning service booking platform for "Royal Cleaning Services" with premium UI, multi-step booking flow, admin dashboard, WhatsApp/Instagram integration, before-and-after image sliders, local SEO pages, dynamic pricing.

## Tech Stack
- Frontend: React SPA (react-router-dom, framer-motion v11, Tailwind CSS, shadcn/ui)
- Backend: FastAPI (Python)
- Database: MongoDB (Motor async driver)
- Auth: JWT

## Architecture
```
/app/
├── backend/server.py         (All API routes + seed data)
├── frontend/src/
│   ├── components/           (Header, Footer, FloatingContact, BeforeAfterSlider, sections/)
│   ├── pages/                (HomePage, ServicesPage, BookingPage, BookingSuccessPage, GalleryPage, ContactPage, LocalSEOPage, admin/)
│   ├── utils/                (api.js, whatsapp.js)
│   ├── context/              (AuthContext.js)
│   ├── constants/            (data.js, testIds.js)
│   └── index.css
└── memory/PRD.md
```

## DB Schema
- `users`: {email, password (bcrypt), role}
- `bookings`: {booking_id, customer_details, service_type, date, time, status, total_price, addons}
- `services`: {name, description, category, image, startingPrice, priceType, duration, features, propertyPricing}
- `leads`: {name, phone, email, message, created_at}
- `reviews`: {name, service, rating, text, status, created_at}

## Key API Endpoints
- POST /api/auth/login
- GET/POST /api/services
- POST /api/bookings
- GET /api/bookings (admin)
- POST /api/leads
- GET/POST/PUT/DELETE /api/reviews
- GET /api/stats (admin)

## What's Been Implemented

### Phase 1 — Core Foundation
- Full project setup: React SPA + FastAPI + MongoDB
- Multi-step booking flow (9 steps)
- Admin dashboard (bookings, services, reviews)
- Navy/Royal Blue/Gold color theme
- WhatsApp & Instagram integration (target="_blank")
- Framer Motion v11 (stable — do NOT upgrade to v12)

### Phase 2 — Service Images + Add-ons (Feb 2026)
- Updated all 4 service images to real photos (carpet, kitchen, bathroom, office)
- Smart Add-ons step (Step 2): sofa dry/wet cleaning (₹499/seat), chair cleaning (₹150/chair)
- Updated MongoDB service records directly

### Phase 3 — Slider + Admin Reviews (Feb 2026)
- BeforeAfterSlider: clipPath-based clipping, global drag listeners, auto-animate on mount
- Fixed bathroom before/after (was using same image for both)
- Admin Reviews: Stats row, labeled approve/reject/reset/delete buttons, custom delete modal, filter tabs with counts, animated cards

### Phase 4 — Android Mobile Optimization (Feb 2026)
- Horizontal service cards in booking Step 1 (64×64 image left + text right)
- Sticky Continue/Confirm bar on mobile (fixed bottom-[60px], sm:hidden)
- Compact "STEP X OF 9" step indicator on mobile (replaces overflowing bubbles)
- Anti-zoom CSS for Android inputs (font-size: 16px on mobile)
- Removed blue tap-highlight flash on Android
- Active:scale-97 tap feedback on buttons
- .scrollbar-hide utility for filter chips
- WhatsApp message upgraded to rich emoji format with full booking details
- Auto-open WhatsApp after booking confirmation

## Routes
- /, /services, /booking, /booking/success, /gallery, /contact
- /home-cleaning-pune, /sofa-cleaning-pune, /kitchen-cleaning-pune, /bathroom-cleaning-pune, /office-cleaning-pune
- /admin/login, /admin/dashboard, /admin/bookings, /admin/services, /admin/reviews

## Critical Notes
- DO NOT upgrade framer-motion beyond v11.0.3
- Social media links: always <a target="_blank"> — never iframes
- Backend seed images must match data.js (update both when changing)
- Sticky nav bottom-[60px] accounts for FloatingContact bar (60px height)

### Phase 5 — Social Buttons + JustDial + Deploy Ready (Feb 2026)
- Added 4 hero social circle buttons on mobile (Instagram pink, Call blue, WhatsApp green, JustDial orange)
- JustDial URL (https://jsdl.in/DT-49TSAH54KXI) added to whatsapp.js constants
- Desktop floating sidebar now has 4 icons including JustDial
- Mobile bottom bar updated: Call | WhatsApp | JustDial | Book Now
- Filter chips on /services and /gallery now horizontally scrollable on mobile (scrollbar-hide)
- Deployment check: PASS ✅ (only minor DB projection recommendation)
- PWA setup (manifest.json + service worker)
- JWT_SECRET security hardening (remove default fallback)
- CORS restriction for production
- Location area autocomplete in booking step 4
- Filter chips horizontal scroll on services/gallery pages
