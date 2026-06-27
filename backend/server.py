from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Body
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict
from typing import List, Optional, Annotated, Any, Dict
import os, logging, bcrypt, jwt, random, string
from datetime import datetime, timezone, timedelta
from pathlib import Path
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Royal Cleaning Services API")
api_router = APIRouter(prefix="/api")

JWT_SECRET = os.environ.get('JWT_SECRET', 'royal-cleaning-jwt-secret-2024')
JWT_ALGORITHM = "HS256"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def validate_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    return str(v)

PyObjectId = Annotated[str, BeforeValidator(validate_object_id)]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str, role: str) -> str:
    return jwt.encode(
        {"sub": user_id, "email": email, "role": role,
         "exp": datetime.now(timezone.utc) + timedelta(hours=24)},
        JWT_SECRET, algorithm=JWT_ALGORITHM
    )

async def get_current_admin(request: Request):
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


class LoginRequest(BaseModel):
    email: str
    password: str

class BookingCreate(BaseModel):
    service: str
    serviceId: str = ""
    propertyType: str
    location: str
    date: str
    time: str
    customerName: str
    mobile: str
    email: str
    houseNo: str
    street: str
    landmark: Optional[str] = ""
    area: str
    city: str = "Pune"
    pincode: str
    expectedPrice: int
    gst: int
    grandTotal: int
    notes: Optional[str] = ""

class LeadCreate(BaseModel):
    name: str
    phone: str
    email: str
    service: str = ""
    message: str

class ReviewCreate(BaseModel):
    customerName: str
    service: str
    rating: int
    text: str
    customerImage: Optional[str] = ""

class BookingStatusUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class ReviewStatusUpdate(BaseModel):
    status: Optional[str] = None


def generate_booking_id() -> str:
    now = datetime.now(timezone.utc)
    suffix = ''.join(random.choices(string.digits, k=4))
    return f"RCS-{now.strftime('%Y%m')}-{suffix}"


@api_router.post("/auth/login")
async def login(req: LoginRequest):
    user = await db.users.find_one({"email": req.email.lower().strip()})
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(str(user["_id"]), user["email"], user["role"])
    return {"token": token, "user": {"id": str(user["_id"]), "email": user["email"], "name": user["name"], "role": user["role"]}}

@api_router.get("/auth/me")
async def get_me(admin=Depends(get_current_admin)):
    return admin


@api_router.get("/services")
async def get_services():
    services = await db.services.find({"isActive": True}).sort("order", 1).to_list(100)
    for s in services:
        s["id"] = str(s["_id"]); del s["_id"]
    return services

@api_router.get("/services/{service_id}")
async def get_service(service_id: str):
    service = None
    try:
        service = await db.services.find_one({"_id": ObjectId(service_id)})
    except Exception:
        pass
    if not service:
        service = await db.services.find_one({"slug": service_id})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service["id"] = str(service["_id"]); del service["_id"]
    return service

@api_router.post("/admin/services")
async def create_service(service: Dict = Body(...), admin=Depends(get_current_admin)):
    service["isActive"] = True
    service["createdAt"] = datetime.now(timezone.utc).isoformat()
    result = await db.services.insert_one(service)
    return {"id": str(result.inserted_id), "message": "Service created"}

@api_router.put("/admin/services/{service_id}")
async def update_service(service_id: str, update: Dict = Body(...), admin=Depends(get_current_admin)):
    update.pop("_id", None); update.pop("id", None)
    update["updatedAt"] = datetime.now(timezone.utc).isoformat()
    await db.services.update_one({"_id": ObjectId(service_id)}, {"$set": update})
    return {"message": "Service updated"}

@api_router.delete("/admin/services/{service_id}")
async def delete_service(service_id: str, admin=Depends(get_current_admin)):
    await db.services.update_one({"_id": ObjectId(service_id)}, {"$set": {"isActive": False}})
    return {"message": "Service deactivated"}


@api_router.post("/bookings")
async def create_booking(booking: BookingCreate):
    booking_id = generate_booking_id()
    doc = {**booking.model_dump(), "bookingId": booking_id, "status": "pending",
           "createdAt": datetime.now(timezone.utc).isoformat(),
           "updatedAt": datetime.now(timezone.utc).isoformat()}
    await db.bookings.insert_one(doc)
    return {"bookingId": booking_id, "message": "Booking created successfully",
            "customerName": booking.customerName, "mobile": booking.mobile,
            "service": booking.service, "date": booking.date, "time": booking.time,
            "address": f"{booking.houseNo}, {booking.street}, {booking.area}, {booking.city}",
            "expectedPrice": booking.expectedPrice, "grandTotal": booking.grandTotal}

@api_router.get("/bookings/{booking_ref}")
async def get_booking(booking_ref: str):
    booking = await db.bookings.find_one({"bookingId": booking_ref})
    if not booking:
        try:
            booking = await db.bookings.find_one({"_id": ObjectId(booking_ref)})
        except Exception:
            pass
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking["id"] = str(booking["_id"]); del booking["_id"]
    return booking

@api_router.get("/admin/bookings")
async def get_all_bookings(skip: int = 0, limit: int = 50, status: str = "", search: str = "", admin=Depends(get_current_admin)):
    query = {}
    if status:
        query["status"] = status
    if search:
        query["$or"] = [
            {"customerName": {"$regex": search, "$options": "i"}},
            {"bookingId": {"$regex": search, "$options": "i"}},
            {"mobile": {"$regex": search, "$options": "i"}},
            {"service": {"$regex": search, "$options": "i"}}
        ]
    total = await db.bookings.count_documents(query)
    bookings = await db.bookings.find(query).sort("createdAt", -1).skip(skip).limit(limit).to_list(limit)
    for b in bookings:
        b["id"] = str(b["_id"]); del b["_id"]
    return {"bookings": bookings, "total": total}

@api_router.put("/admin/bookings/{booking_id}")
async def update_booking(booking_id: str, update: BookingStatusUpdate, admin=Depends(get_current_admin)):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data["updatedAt"] = datetime.now(timezone.utc).isoformat()
    await db.bookings.update_one({"bookingId": booking_id}, {"$set": update_data})
    return {"message": "Booking updated"}


@api_router.post("/leads")
async def create_lead(lead: LeadCreate):
    doc = {**lead.model_dump(), "status": "new", "createdAt": datetime.now(timezone.utc).isoformat()}
    result = await db.leads.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Thank you! We'll contact you shortly."}

@api_router.get("/admin/leads")
async def get_leads(admin=Depends(get_current_admin)):
    leads = await db.leads.find().sort("createdAt", -1).to_list(200)
    for l in leads:
        l["id"] = str(l["_id"]); del l["_id"]
    return leads


@api_router.get("/reviews")
async def get_reviews():
    reviews = await db.reviews.find({"status": "approved"}).sort("createdAt", -1).to_list(50)
    for r in reviews:
        r["id"] = str(r["_id"]); del r["_id"]
    return reviews

@api_router.post("/reviews")
async def submit_review(review: ReviewCreate):
    doc = {**review.model_dump(), "status": "pending", "createdAt": datetime.now(timezone.utc).isoformat()}
    result = await db.reviews.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Review submitted for approval"}

@api_router.get("/admin/reviews")
async def get_all_reviews(admin=Depends(get_current_admin)):
    reviews = await db.reviews.find().sort("createdAt", -1).to_list(200)
    for r in reviews:
        r["id"] = str(r["_id"]); del r["_id"]
    return reviews

@api_router.put("/admin/reviews/{review_id}")
async def update_review(review_id: str, update: ReviewStatusUpdate, admin=Depends(get_current_admin)):
    await db.reviews.update_one({"_id": ObjectId(review_id)},
        {"$set": {k: v for k, v in update.model_dump().items() if v is not None}})
    return {"message": "Review updated"}

@api_router.delete("/admin/reviews/{review_id}")
async def delete_review(review_id: str, admin=Depends(get_current_admin)):
    await db.reviews.delete_one({"_id": ObjectId(review_id)})
    return {"message": "Review deleted"}


@api_router.get("/admin/stats")
async def get_stats(admin=Depends(get_current_admin)):
    total_bookings = await db.bookings.count_documents({})
    pending = await db.bookings.count_documents({"status": "pending"})
    confirmed = await db.bookings.count_documents({"status": "confirmed"})
    completed = await db.bookings.count_documents({"status": "completed"})
    cancelled = await db.bookings.count_documents({"status": "cancelled"})
    total_leads = await db.leads.count_documents({})
    total_reviews = await db.reviews.count_documents({})
    pending_reviews = await db.reviews.count_documents({"status": "pending"})
    recent_bookings = await db.bookings.find().sort("createdAt", -1).limit(5).to_list(5)
    for b in recent_bookings:
        b["id"] = str(b["_id"]); del b["_id"]
    return {"totalBookings": total_bookings, "pendingBookings": pending,
            "confirmedBookings": confirmed, "completedBookings": completed,
            "cancelledBookings": cancelled, "totalLeads": total_leads,
            "totalReviews": total_reviews, "pendingReviews": pending_reviews,
            "recentBookings": recent_bookings}

@api_router.get("/timeslots")
async def get_time_slots():
    return {"slots": ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
                      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]}

@api_router.get("/")
async def root():
    return {"message": "Royal Cleaning Services API v1.0"}


SERVICES_SEED = [
    {"name": "Home Deep Cleaning", "slug": "home-deep-cleaning",
     "description": "Complete deep cleaning for your entire home. Our trained professionals clean every corner, leaving your home spotless and fresh.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
     "startingPrice": 3499, "priceType": "by_property", "duration": "4-8 Hours",
     "features": ["All rooms deep cleaned", "Kitchen & Bathroom", "Furniture dusting", "Floor mopping & vacuum", "Window cleaning", "Eco-friendly products"],
     "propertyPricing": {"1 BHK": 3499, "2 BHK": 4499, "3 BHK": 5999, "4 BHK": 7499, "Villa/Bungalow": 0, "Office": 0, "Shop": 0, "Restaurant": 0},
     "isActive": True, "order": 1, "isMostPopular": True},
    {"name": "Office Cleaning", "slug": "office-cleaning",
     "description": "Professional office cleaning to maintain a clean and productive workspace for your team.",
     "category": "commercial", "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
     "startingPrice": 2999, "priceType": "fixed", "duration": "3-8 Hours",
     "features": ["Workstation cleaning", "Meeting room", "Common area", "Restroom sanitization", "Floor mopping"],
     "propertyPricing": {"1 BHK": 2999, "2 BHK": 3999, "3 BHK": 4999, "4 BHK": 5999, "Villa/Bungalow": 0, "Office": 2999, "Shop": 2999, "Restaurant": 0},
     "isActive": True, "order": 2, "isMostPopular": False},
    {"name": "Sofa Cleaning", "slug": "sofa-cleaning",
     "description": "Deep shampooing and upholstery cleaning for your sofas and fabric furniture.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
     "startingPrice": 499, "priceType": "per_seat", "duration": "30-120 Minutes",
     "features": ["Hot water extraction", "Stain removal", "Odor elimination", "Fabric protection", "Quick dry"],
     "propertyPricing": {"1 BHK": 999, "2 BHK": 1499, "3 BHK": 1999, "4 BHK": 2499, "Villa/Bungalow": 2999, "Office": 1999, "Shop": 1499, "Restaurant": 2499},
     "isActive": True, "order": 3, "isMostPopular": True},
    {"name": "Carpet Cleaning", "slug": "carpet-cleaning",
     "description": "Professional carpet cleaning using advanced techniques to remove deep-seated dirt and stains.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
     "startingPrice": 699, "priceType": "fixed", "duration": "30-90 Minutes",
     "features": ["Steam cleaning", "Stain treatment", "Deodorization", "Quick drying", "Fiber protection"],
     "propertyPricing": {"1 BHK": 699, "2 BHK": 999, "3 BHK": 1299, "4 BHK": 1599, "Villa/Bungalow": 1999, "Office": 1499, "Shop": 999, "Restaurant": 1499},
     "isActive": True, "order": 4, "isMostPopular": False},
    {"name": "Kitchen Deep Cleaning", "slug": "kitchen-cleaning",
     "description": "Thorough deep cleaning of your entire kitchen including appliances, tiles, and surfaces.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
     "startingPrice": 1499, "priceType": "fixed", "duration": "2-4 Hours",
     "features": ["Chimney/hob cleaning", "Tile & grout", "Cabinet cleaning", "Sink sanitization", "Appliance cleaning", "Grease removal"],
     "propertyPricing": {"1 BHK": 1499, "2 BHK": 1499, "3 BHK": 1499, "4 BHK": 1999, "Villa/Bungalow": 2499, "Office": 1499, "Shop": 1499, "Restaurant": 2999},
     "isActive": True, "order": 5, "isMostPopular": True},
    {"name": "Bathroom Deep Cleaning", "slug": "bathroom-cleaning",
     "description": "Complete sanitization and deep cleaning for a hygienic, sparkling clean bathroom.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
     "startingPrice": 499, "priceType": "per_bathroom", "duration": "30-60 Minutes",
     "features": ["Tile & grout cleaning", "Toilet sanitization", "Basin cleaning", "Limescale removal", "Floor scrubbing", "Fixture polishing"],
     "propertyPricing": {"1 BHK": 499, "2 BHK": 999, "3 BHK": 1299, "4 BHK": 1599, "Villa/Bungalow": 1999, "Office": 999, "Shop": 499, "Restaurant": 999},
     "isActive": True, "order": 6, "isMostPopular": False},
    {"name": "Move-In Cleaning", "slug": "move-in-cleaning",
     "description": "Complete cleaning of your new home before moving in, ensuring a fresh and hygienic start.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1560440021-33f9b867899d?w=600&q=80",
     "startingPrice": 3999, "priceType": "by_property", "duration": "5-8 Hours",
     "features": ["Complete property cleaning", "Kitchen deep clean", "Bathroom sanitization", "Floor scrubbing", "Wall & ceiling dust", "Window cleaning"],
     "propertyPricing": {"1 BHK": 3999, "2 BHK": 4999, "3 BHK": 6499, "4 BHK": 7999, "Villa/Bungalow": 0, "Office": 4999, "Shop": 3999, "Restaurant": 5999},
     "isActive": True, "order": 7, "isMostPopular": False},
    {"name": "Move-Out Cleaning", "slug": "move-out-cleaning",
     "description": "Thorough cleaning when vacating to ensure you get your full security deposit back.",
     "category": "residential", "image": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
     "startingPrice": 3999, "priceType": "by_property", "duration": "5-8 Hours",
     "features": ["Complete property cleaning", "Spot cleaning", "Kitchen & bathroom deep clean", "Floor polishing", "Wall cleaning", "Inspection-ready finish"],
     "propertyPricing": {"1 BHK": 3999, "2 BHK": 4999, "3 BHK": 6499, "4 BHK": 7999, "Villa/Bungalow": 0, "Office": 4999, "Shop": 3999, "Restaurant": 5999},
     "isActive": True, "order": 8, "isMostPopular": False},
    {"name": "Commercial Cleaning", "slug": "commercial-cleaning",
     "description": "Professional cleaning solutions for commercial spaces - hotels, restaurants, warehouses.",
     "category": "commercial", "image": "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&q=80",
     "startingPrice": 0, "priceType": "custom", "duration": "Depends on Site Size",
     "features": ["Customized cleaning plan", "Industrial-grade equipment", "Flexible scheduling", "Trained cleaners", "Free site inspection", "Competitive pricing"],
     "propertyPricing": {"1 BHK": 0, "2 BHK": 0, "3 BHK": 0, "4 BHK": 0, "Villa/Bungalow": 0, "Office": 0, "Shop": 0, "Restaurant": 0},
     "isActive": True, "order": 9, "isMostPopular": False}
]

REVIEWS_SEED = [
    {"customerName": "Priya Sharma", "service": "Home Deep Cleaning", "rating": 5,
     "text": "Absolutely amazing service! My 3BHK was cleaned spotlessly. The team was professional, punctual, and used eco-friendly products. Will definitely book again!",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?w=100&q=80", "createdAt": "2024-12-15T10:00:00Z"},
    {"customerName": "Rahul Mehta", "service": "Office Cleaning", "rating": 5,
     "text": "Royal Cleaning transformed our office space completely. The team was thorough, efficient, and very professional. Our entire office is sparkling clean!",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1725033489648-a819750348eb?w=100&q=80", "createdAt": "2025-01-20T14:00:00Z"},
    {"customerName": "Anita Desai", "service": "Sofa Cleaning", "rating": 5,
     "text": "My sofa looks brand new after the cleaning! All the stubborn stains were removed and it smells wonderful. Great value for money!",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=100&q=80", "createdAt": "2025-01-25T11:00:00Z"},
    {"customerName": "Suresh Patil", "service": "Kitchen Deep Cleaning", "rating": 5,
     "text": "The kitchen looks brand new! Every corner was cleaned thoroughly. The team worked efficiently and left no mess. Highly recommended for Pune residents!",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=100&q=80", "createdAt": "2025-02-01T09:00:00Z"},
    {"customerName": "Meera Joshi", "service": "Move-In Cleaning", "rating": 5,
     "text": "We moved into a perfectly clean home thanks to Royal Cleaning Services. Every nook and corner was spotless. Amazing attention to detail!",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80", "createdAt": "2025-02-10T15:00:00Z"},
    {"customerName": "Amit Kumar", "service": "Bathroom Deep Cleaning", "rating": 4,
     "text": "Very impressed with the bathroom cleaning. The tiles look sparkling clean and the limescale is completely gone. Very professional team, on time and efficient.",
     "status": "approved", "customerImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", "createdAt": "2025-02-15T13:00:00Z"},
]


async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@royalcleaning.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "email": admin_email, "password_hash": hash_password(admin_password),
            "name": "Admin", "role": "admin", "createdAt": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                   {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info(f"Admin password updated: {admin_email}")


async def seed_services():
    count = await db.services.count_documents({})
    if count == 0:
        await db.services.insert_many(SERVICES_SEED)
        logger.info(f"Seeded {len(SERVICES_SEED)} services")


async def seed_reviews():
    count = await db.reviews.count_documents({})
    if count == 0:
        await db.reviews.insert_many(REVIEWS_SEED)
        logger.info(f"Seeded {len(REVIEWS_SEED)} reviews")


@app.on_event("startup")
async def startup_event():
    try:
        await db.users.create_index("email", unique=True)
        await db.bookings.create_index("bookingId")
        await seed_admin()
        await seed_services()
        await seed_reviews()
        logger.info("Royal Cleaning Services API started successfully")
    except Exception as e:
        logger.error(f"Startup error: {e}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
