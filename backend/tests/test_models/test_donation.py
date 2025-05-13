import pytest
from app import db
from app.models import Donation, Donor, Charity
from datetime import datetime
from app import create_app, db

@pytest.fixture
def app():
    app = create_app('testing')  # Make sure your 'testing' config is set properly
    with app.app_context():
        db.create_all()  # Create all tables
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def setup_donor_charity(app):
    with app.app_context():
        # Create a donor and charity for use in tests
        donor = Donor(full_name="Test Donor", email="donor@example.com")
        charity = Charity(full_name="Test Charity", contact="0700000000", email="charity@example.com")
        db.session.add_all([donor, charity])
        db.session.commit()
        return donor, charity

def test_create_donation(app):
    with app.app_context():
        # Create a charity
        charity = Charity(full_name="Helping Hands", contact="0700123456", email="help@hands.org")
        db.session.add(charity)
        db.session.commit()

        # Create a donor
        donor = Donor(full_name="John Doe", email="john.doe@example.com")
        db.session.add(donor)
        db.session.commit()  # Ensure donor is committed to get the donor ID

        # Ensure donor ID is valid
        assert donor.id is not None

        # Create a donation linked to both donor and charity
        donation = Donation(
            donor_id=donor.id,
            charity_id=charity.id,
            amount=100.0,
            frequency="Monthly"
        )
        db.session.add(donation)
        db.session.commit()

        # Assert that the donation was created successfully
        assert donation.id is not None
        assert donation.donor_id == donor.id
        assert donation.charity_id == charity.id
        assert donation.amount == 100.0
        assert donation.frequency == "Monthly"

def test_anonymous_donor_name(app, setup_donor_charity):
    """Test that donor_name is shown as 'Anonymous' when donation is anonymous."""
    donor, charity = setup_donor_charity

    with app.app_context():
        # Create a donation with no donor (anonymous donation)
        donation = Donation(
            donor_id=None,  
            charity_id=charity.id,  # Valid charity ID
            amount=100.0,  # Valid amount
            frequency="one-time",  # Donation frequency
            anonymous=True  # Mark as anonymous
        )
        db.session.add(donation)
        db.session.commit()

        # Ensure donor_name is 'Anonymous'
        assert donation.to_dict()["donor_name"] == "Anonymous"

def test_create_donation(app):
    with app.app_context():
        # Create a charity
        charity = Charity(full_name="Helping Hands", contact="0700123456", email="help@hands.org")
        db.session.add(charity)
        db.session.commit()

        # Create a donor
        donor = Donor(full_name="John Doe", email="john.doe@example.com")
        db.session.add(donor)
        db.session.commit()  # Ensure donor is committed to get the donor ID

        # Ensure donor ID is valid
        assert donor.id is not None
        # Ensure charity ID is valid
        assert charity.id is not None

        # Create a donation linked to both donor and charity with all the fields
        donation = Donation(
            # donor_id=donor.id, 
            charity_id=charity.id,  
            amount=250.0, 
            frequency="weekly",  
            anonymous=False, 
            repeat_donation=True,  
            reminder_set=True,  
            date=datetime.utcnow()  
        )
        db.session.add(donation)
        db.session.commit()

        # Assert that the donation was created successfully
        assert donation.id is not None
        assert donation.donor_id == donor.id
        assert donation.charity_id == charity.id
        assert donation.amount == 250.0
        assert donation.frequency == "weekly"
        assert donation.anonymous is False
        assert donation.repeat_donation is True
        assert donation.reminder_set is True
        assert donation.date is not None


def test_donation_repr(app, setup_donor_charity):
    """Test the __repr__ output of the Donation model."""
    donor, charity = setup_donor_charity

    with app.app_context():
        # Create a donation linked to donor and charity
        donation = Donation(
            donor_id=donor.id,
            charity_id=charity.id,
            amount=100.0,
            frequency="weekly"
        )
        db.session.add(donation)
        db.session.commit()

        # Check if the repr string includes the amount and charity name
        assert f"{donation.amount}" in repr(donation)
        assert charity.full_name in repr(donation)