import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "prachikhule05@gmail.com"
ADMIN_PASSWORD = "Prachi@2799"

@pytest.fixture(scope="module")
def admin_token():
    resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if resp.status_code == 200:
        return resp.json()["token"]
    pytest.skip(f"Admin login failed: {resp.text}")

@pytest.fixture(scope="module")
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# --- Auth tests ---
class TestAuth:
    def test_admin_login_success(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert resp.status_code == 200
        data = resp.json()
        assert "token" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"

    def test_login_invalid_credentials(self):
        resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert resp.status_code == 401

    def test_get_me(self, admin_headers):
        resp = requests.get(f"{BASE_URL}/api/auth/me", headers=admin_headers)
        assert resp.status_code == 200


# --- Services tests ---
class TestServices:
    def test_get_services(self):
        resp = requests.get(f"{BASE_URL}/api/services")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) == 9
        for s in data:
            assert "id" in s
            assert "_id" not in s

    def test_get_service_by_slug(self):
        resp = requests.get(f"{BASE_URL}/api/services/home-deep-cleaning")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "home-deep-cleaning"
        assert "_id" not in data

    def test_get_service_not_found(self):
        resp = requests.get(f"{BASE_URL}/api/services/non-existent-service")
        assert resp.status_code == 404


# --- Booking tests ---
class TestBookings:
    booking_id = None

    def test_create_booking(self):
        payload = {
            "service": "Home Deep Cleaning",
            "serviceId": "",
            "propertyType": "2 BHK",
            "location": "Baner",
            "date": "2026-03-15",
            "time": "10:00 AM",
            "customerName": "TEST_User",
            "mobile": "9876543210",
            "email": "test@test.com",
            "houseNo": "101",
            "street": "Test Society",
            "landmark": "",
            "area": "Baner",
            "city": "Pune",
            "pincode": "411045",
            "expectedPrice": 4499,
            "gst": 810,
            "grandTotal": 5309,
            "notes": ""
        }
        resp = requests.post(f"{BASE_URL}/api/bookings", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert "bookingId" in data
        assert data["customerName"] == "TEST_User"
        TestBookings.booking_id = data["bookingId"]

    def test_get_booking(self):
        if not TestBookings.booking_id:
            pytest.skip("No booking created")
        resp = requests.get(f"{BASE_URL}/api/bookings/{TestBookings.booking_id}")
        assert resp.status_code == 200
        data = resp.json()
        assert data["bookingId"] == TestBookings.booking_id
        assert "_id" not in data

    def test_get_admin_bookings(self, admin_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/bookings", headers=admin_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "bookings" in data
        assert "total" in data

    def test_update_booking_status(self, admin_headers):
        if not TestBookings.booking_id:
            pytest.skip("No booking created")
        resp = requests.put(f"{BASE_URL}/api/admin/bookings/{TestBookings.booking_id}",
                            json={"status": "confirmed"}, headers=admin_headers)
        assert resp.status_code == 200


# --- Leads tests ---
class TestLeads:
    def test_create_lead(self):
        payload = {
            "name": "TEST_Lead User",
            "phone": "9876543210",
            "email": "testlead@test.com",
            "service": "Home Deep Cleaning",
            "message": "Test inquiry from automated testing"
        }
        resp = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert "id" in data

    def test_get_admin_leads(self, admin_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/leads", headers=admin_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)


# --- Reviews tests ---
class TestReviews:
    review_id = None

    def test_get_approved_reviews(self):
        resp = requests.get(f"{BASE_URL}/api/reviews")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        for r in data:
            assert "_id" not in r

    def test_submit_review(self):
        payload = {"customerName": "TEST_Reviewer", "service": "Home Deep Cleaning", "rating": 5, "text": "Test review text"}
        resp = requests.post(f"{BASE_URL}/api/reviews", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert "id" in data
        TestReviews.review_id = data["id"]

    def test_get_admin_reviews(self, admin_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/reviews", headers=admin_headers)
        assert resp.status_code == 200

    def test_approve_review(self, admin_headers):
        if not TestReviews.review_id:
            pytest.skip("No review created")
        resp = requests.put(f"{BASE_URL}/api/admin/reviews/{TestReviews.review_id}",
                            json={"status": "approved"}, headers=admin_headers)
        assert resp.status_code == 200


# --- Stats test ---
class TestStats:
    def test_get_admin_stats(self, admin_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/stats", headers=admin_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "totalBookings" in data
        assert "totalLeads" in data
        assert "totalReviews" in data

    def test_get_timeslots(self):
        resp = requests.get(f"{BASE_URL}/api/timeslots")
        assert resp.status_code == 200
        data = resp.json()
        assert "slots" in data
        assert len(data["slots"]) > 0
