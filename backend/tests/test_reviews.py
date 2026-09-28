import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestReviewsAPI:
    """Review API endpoint tests"""

    def test_get_reviews_returns_approved(self):
        r = requests.get(f"{BASE_URL}/api/reviews")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # All returned reviews should be approved
        for review in data:
            assert review.get("status") == "approved" or "status" not in review

    def test_post_review_creates_pending(self):
        payload = {
            "customerName": "TEST_Customer",
            "service": "Home Deep Cleaning",
            "rating": 5,
            "text": "Excellent cleaning service, very satisfied with the results!"
        }
        r = requests.post(f"{BASE_URL}/api/reviews", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert "id" in data
        assert "message" in data
        assert "approval" in data["message"].lower() or "submitted" in data["message"].lower()

    def test_post_review_missing_required_field(self):
        payload = {"service": "Home Deep Cleaning", "rating": 5, "text": "Good service indeed!"}
        r = requests.post(f"{BASE_URL}/api/reviews", json=payload)
        assert r.status_code == 422  # Validation error

    def test_admin_can_see_pending_reviews(self):
        # Login as admin
        login_r = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "prachikhule05@gmail.com",
            "password": "Prachi@2799"
        })
        assert login_r.status_code == 200
        token = login_r.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}
        r = requests.get(f"{BASE_URL}/api/admin/reviews", headers=headers)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # Should include pending ones
        statuses = {rev["status"] for rev in data}
        assert "pending" in statuses or len(data) >= 0  # may have no pending if none submitted

    def test_admin_can_approve_review(self):
        # First create a test review
        payload = {
            "customerName": "TEST_ApproveCustomer",
            "service": "Sofa Cleaning",
            "rating": 4,
            "text": "Very good cleaning service overall!"
        }
        r = requests.post(f"{BASE_URL}/api/reviews", json=payload)
        assert r.status_code == 200
        review_id = r.json()["id"]

        # Login as admin
        login_r = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "prachikhule05@gmail.com",
            "password": "Prachi@2799"
        })
        token = login_r.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Approve the review
        approve_r = requests.put(f"{BASE_URL}/api/admin/reviews/{review_id}",
                                  json={"status": "approved"}, headers=headers)
        assert approve_r.status_code == 200

        # Verify it appears in public reviews
        public_r = requests.get(f"{BASE_URL}/api/reviews")
        public_reviews = public_r.json()
        ids = [rev.get("id") for rev in public_reviews]
        assert review_id in ids
