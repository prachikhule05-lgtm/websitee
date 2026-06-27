# Royal Cleaning Services - PRD

## Original Problem Statement
Build a production-ready, highly polished cleaning service booking platform for "Royal Cleaning Services" with:
- Premium UI with rich animations
- Multi-step booking flow
- Admin dashboard
- WhatsApp/Instagram integration
- Before-and-after image sliders
- Local SEO pages
- Dynamic pricing
- Robust admin dashboard

## Tech Stack
- Frontend: React SPA (react-router-dom, framer-motion v11, Tailwind CSS, shadcn/ui)
- Backend: FastAPI (Python)
- Database: MongoDB (Motor async driver)
- Auth: JWT

## Architecture
```
/app/
├── backend/
│   ├── server.py         (All API routes + seed data)
│   ├── requirements.txt
│   └── .env              (MONGO_URL, DB_NAME, JWT_SECRET)
├── frontend/
│   ├── src/
│   │   ├── components/   (Header, Footer, FloatingContact, BeforeAfterSlider, sections/, ui/)
│   │   ├── pages/        (HomePage, ServicesPage, BookingPage, BookingSuccessPage, GalleryPage, ContactPage, LocalSEOPage, admin/)
│   │   ├── utils/        (api.js, whatsapp.js)
│   │   ├── context/      (AuthContext.js)
│   │   ├── constants/    (data.js, testIds.js)
│   │   ├── App.js
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── memory/
    ├── PRD.md
    └── test_credentials.md
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
- GET/POST /api/reviews
- GET /api/stats (admin)

## What's Been Implemented

### Phase 1 (Session 1) - Complete
- Full project setup and boilerplate
- MongoDB integration with Motor
- Multi-step booking flow (9 steps)
- Admin dashboard with booking/service/review management
- Framer Motion v11 (downgraded from v12 to fix compile errors)
- Navy/Royal Blue/Gold color theme
- Horizontal service card layout

### Phase 2 (Session 2 - Feb 2026) - Complete
- Updated service images to match real cleaning services:
  - Carpet Cleaning: user-uploaded real carpet cleaning photo
  - Kitchen Deep Cleaning: user-uploaded kitchen cleaning photo
  - Bathroom Deep Cleaning: Pexels bathroom tile scrubbing photo
  - Office Cleaning: Unsplash office cleaning mop photo
- Added smart Add-ons step (Step 2) to booking flow:
  - Asks if user has sofa/furnished flat
  - Dry or Wet sofa cleaning (wet = ₹499/seat)
  - Chair cleaning: ₹150 per chair with +/- counter
  - Updated grand total in summary step

## Routes
- / (HomePage)
- /services (ServicesPage)
- /booking (BookingPage - 9 steps)
- /booking/success (BookingSuccessPage)
- /gallery (GalleryPage with BeforeAfterSlider)
- /contact (ContactPage)
- /home-cleaning-pune, /sofa-cleaning-pune, /kitchen-cleaning-pune, /bathroom-cleaning-pune, /office-cleaning-pune, /commercial-cleaning-pune (LocalSEOPage)
- /admin/login, /admin/dashboard, /admin/bookings, /admin/services, /admin/reviews

## Critical Notes
- DO NOT upgrade framer-motion beyond v11.0.3 (v12 breaks with GroupAnimationWithThen errors)
- Social media links always use <a target="_blank"> - never iframes
- Always use REACT_APP_BACKEND_URL from .env for API calls
- Backend seed data (SERVICES_SEED in server.py) is the source of truth for service images

## P1 Backlog
- Admin review moderation (approve/reject/delete full controls)
- Before-After slider interactive drag comparison (currently displays)
- PWA setup (manifest.json, service worker, offline fallback)

## P2 Backlog
- JWT_SECRET security hardening (remove fallback default)
- CORS restriction for production (currently allow_origins=['*'])
- Location area suggestions in booking step 4
