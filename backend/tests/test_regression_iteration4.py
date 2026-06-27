"""Regression tests for Royal Cleaning Services - Iteration 4
Tests: JWT_SECRET fix, /admin/stats aggregation, services, booking creation
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_EMAIL = "prachikhule05@gmail.com"
ADMIN_PASSWORD = "Prachi@2799"


@pytest.fixture(scope="module")
def admin_token():
    resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    return resp.json()["token"]


# Health check
def test_api_health():
    resp = requests.get(f"{BASE_URL}/api/")
    assert resp.status_code == 200
    assert "message" in resp.json()
    print(f"Health OK: {resp.json()['message']}")


# Auth - JWT_SECRET fix verification
def test_admin_login():
    resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    data = resp.json()
    assert "token" in data
    assert len(data["token"]) > 0
    print("Admin login OK")


def test_admin_login_wrong_password():
    resp = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
    assert resp.status_code in [401, 403]
    print("Wrong password correctly rejected")


# Admin stats - aggregation pipeline
def test_admin_stats_structure(admin_token):
    resp = requests.get(f"{BASE_URL}/api/admin/stats", headers={"Authorization": f"Bearer {admin_token}"})
    assert resp.status_code == 200, f"Stats failed: {resp.text}"
    data = resp.json()
    required_keys = ["totalBookings", "pendingBookings", "confirmedBookings", "completedBookings",
                     "cancelledBookings", "totalLeads", "totalReviews", "pendingReviews", "recentBookings"]
    for key in required_keys:
        assert key in data, f"Missing key: {key}"
    assert isinstance(data["recentBookings"], list)
    print(f"Stats OK: totalBookings={data['totalBookings']}, totalLeads={data['totalLeads']}")


def test_admin_stats_without_auth():
    resp = requests.get(f"{BASE_URL}/api/admin/stats")
    assert resp.status_code in [401, 403]


# Services
def test_get_services():
    resp = requests.get(f"{BASE_URL}/api/services")
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) > 0
    print(f"Services OK: {len(data)} services found")


# Booking creation
def test_create_booking():
    payload = {
        "service": "Home Deep Cleaning",
        "serviceId": "",
        "propertyType": "1 BHK",
        "location": "Pune",
        "date": "2026-09-01",
        "time": "10:00 AM",
        "customerName": "TEST_User Regression",
        "mobile": "9999999999",
        "email": "test_regression@example.com",
        "houseNo": "101",
        "street": "Test Street",
        "area": "Baner",
        "pincode": "411045",
        "expectedPrice": 3999,
        "gst": 130,
        "grandTotal": 4129
    }
    resp = requests.post(f"{BASE_URL}/api/bookings", json=payload)
    assert resp.status_code == 200, f"Booking failed: {resp.text}"
    data = resp.json()
    assert "bookingId" in data
    assert data["bookingId"].startswith("RCS-")
    print(f"Booking created: {data['bookingId']}")
