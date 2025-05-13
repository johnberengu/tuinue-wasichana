import pytest
from app import create_app, db
from app.models import User,Charity

# Create the app instance for testing
@pytest.fixture(scope='module')
def app():
    app = create_app('testing')  # Make sure you're using the testing config
    with app.app_context():
        yield app

# Fixture to set up and tear down the database
@pytest.fixture(scope='function', autouse=True)
def clean_db(app):
    # Clean up the database before each test
    with app.app_context():
        db.create_all()
        yield
        db.session.remove()
        db.drop_all()

# Test user creation
def test_user_creation(app):
    with app.app_context():
        try:
            # Cleanup: Delete any existing user with the same email
            User.query.filter_by(email="charity@example.com").delete()
            db.session.commit()

            # Now create the new user
            user = User(username="charityuser", email="charity@example.com", password="password")
            db.session.add(user)
            db.session.commit()

            # Verify that the user was added
            created_user = User.query.filter_by(email="charity@example.com").first()
            assert created_user is not None
            assert created_user.username == "charityuser"
            assert created_user.email == "charity@example.com"
        finally:
            db.session.remove()

# Test unique email constraint
def test_username_and_email_uniqueness(app):
    with app.app_context():
        # Try to create a user with an existing email
        user1 = User(username="user1", email="unique@example.com", password="password")
        db.session.add(user1)
        db.session.commit()

        # This should raise a UniqueViolation error due to duplicate email
        with pytest.raises(Exception):
            user2 = User(username="user2", email="unique@example.com", password="password")
            db.session.add(user2)
            db.session.commit()

# Test nullable fields
def test_nullable_fields(app):
    with app.app_context():
        # Try creating a user with nullable fields
        user = User(username="user3", email="user3@example.com", password="password", full_name=None, contact=None)
        db.session.add(user)
        db.session.commit()
        
        created_user = User.query.filter_by(email="user3@example.com").first()
        assert created_user is not None
        assert created_user.full_name is None
        assert created_user.contact is None

# Test user-charity relationship (assuming you have a Charity model and a relationship set up)
def test_user_charity_relationship(app):
    with app.app_context():
        user = User(username="charityuser", email="charity@example.com", password="password")
        charity = Charity(
            full_name="Test Charity",
            contact="0712345678",
            email="charityorg@example.com",
            description="Test Description",
            user=user  #
        )
        db.session.add(user)
        db.session.add(charity)
        db.session.commit()

        assert user.charity == charity
        assert charity.user == user


