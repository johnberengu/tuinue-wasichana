import pytest
from app import create_app, db
from app.models import Donor, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# Define the test_app fixture
@pytest.fixture(scope='module')
def test_app():
    app = create_app('testing')  # Make sure you use the testing configuration
    yield app

# Define the init_database fixture
@pytest.fixture(scope='module')
def init_database(test_app):
    bcrypt.init_app(test_app)

    with test_app.app_context():
        db.create_all()

        test_user = User(
            username="testuser",
            email="test@example.com",
            password=bcrypt.generate_password_hash("testpass").decode('utf-8')
        )
        db.session.add(test_user)
        db.session.commit()

        test_donor = Donor(
            user_id=test_user.id,
            full_name="John Doe",
            email="john@example.com",
            is_anonymous=True,
            repeat_donation=True,
            donation_interval="monthly",
            reminder_set=True,
            contact="0712345678",
            profile_pic="profile.jpg"
        )
        db.session.add(test_donor)
        db.session.commit()

    yield db

    with test_app.app_context():
        db.drop_all()


# Test the donor creation
def test_donor_creation(test_app, init_database):
    with test_app.app_context():
        donor = Donor.query.filter_by(email="john@example.com").first()
        assert donor is not None
        assert donor.full_name == "John Doe"
        assert donor.email == "john@example.com"
        assert donor.is_anonymous is True
        assert donor.donation_interval == "monthly"
        assert donor.contact == "0712345678"
        assert donor.profile_pic == "profile.jpg"
