import pytest
from app import create_app, db
from app.models import Charity, User

# Fixture to create the app and setup the test database
@pytest.fixture
def app():
    app = create_app('testing')  # Make sure your 'testing' config is set properly
    with app.app_context():
        db.create_all()  # Create all tables
        yield app
        db.session.remove()
        db.drop_all()  # Clean up after each test

# Test creating a Charity that is linked to a User
def test_create_charity_with_user(app):
    with app.app_context():
        user = User(username="charityuser", email="charity@example.com", password="pass")
        db.session.add(user)
        db.session.flush()  # Assign user.id

        charity = Charity(
            user_id=user.id,
            full_name="Helping Hands",
            contact="0700123456",
            email="help@hands.org",
            password_hash="hashed_password",  
            description="We help people",
            website_url="https://helpinghands.org"
        )
        db.session.add(charity)
        db.session.commit()

        assert charity.id is not None
        assert charity.user_id == user.id
        assert charity.user == user

# Simple sanity check test
def test_addition():
    assert 1 + 1 == 2
