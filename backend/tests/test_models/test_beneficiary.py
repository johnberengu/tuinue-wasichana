import pytest
from app import create_app, db
from app.models import Beneficiary, Charity, User, Inventory

@pytest.fixture
def app():
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

def test_create_beneficiary(app):
    with app.app_context():
        user = User(username="charityuser", email="charity@example.com", password="pass")
        db.session.add(user)
        db.session.flush()

        charity = Charity(
            full_name="Charity Org",
            contact="0700000000",
            email="charity@org.com",
            password_hash="hashed",
            description="A great charity",
            website_url="http://charity.org",
            user_id=user.id
        )
        db.session.add(charity)
        db.session.flush()

        beneficiary = Beneficiary(
            name="Community Group",
            location="Kibera",
            number_of_people=25,
            charity_id=charity.id
        )
        db.session.add(beneficiary)
        db.session.commit()

        assert beneficiary.id is not None
        assert beneficiary.name == "Community Group"
        assert beneficiary.location == "Kibera"
        assert beneficiary.number_of_people == 25
        assert beneficiary.charity_id == charity.id
        assert beneficiary.charity == charity

def test_beneficiary_serialization(app):
    with app.app_context():
        user = User(username="testuser2", email="user2@example.com", password="pass")
        db.session.add(user)
        db.session.flush()

        charity = Charity(
            full_name="Serialize Charity",
            contact="0700111222",
            email="serialize@charity.com",
            password_hash="hashed",
            description="Charity for serialization test",
            website_url="http://serialize.org",
            user_id=user.id
        )
        db.session.add(charity)
        db.session.flush()

        beneficiary = Beneficiary(
            name="Serialized Group",
            location="Mathare",
            number_of_people=15,
            charity_id=charity.id
        )
        db.session.add(beneficiary)
        db.session.commit()

        serialized = beneficiary.serialize()
        assert serialized['id'] == beneficiary.id
        assert serialized['name'] == "Serialized Group"
        assert serialized['location'] == "Mathare"
        assert serialized['number_of_people'] == 15
        assert serialized['charity_id'] == charity.id

        
def test_inventory_cascade_delete(app):
    with app.app_context():
        # Create a user
        user = User(username="cascadeuser", email="cascade@example.com", password="pass")
        db.session.add(user)
        db.session.flush()

        # Create a charity
        charity = Charity(
            full_name="Cascade Charity",
            contact="0700333444",
            email="cascade@charity.com",
            password_hash="hashed",
            description="Cascade delete test",
            website_url="http://cascade.org",
            user_id=user.id
        )
        db.session.add(charity)
        db.session.flush()

        # Create a beneficiary linked to the charity
        beneficiary = Beneficiary(
            name="Cascade Group",
            location="Kayole",
            charity_id=charity.id
        )
        db.session.add(beneficiary)
        db.session.flush()

        # Add an inventory item linked to the beneficiary
        inventory = Inventory(
            item_name="Pads",
            quantity=50,
            beneficiary_id=beneficiary.id,
            charity_id=charity.id
        )
        db.session.add(inventory)
        db.session.commit()

        # Verify inventory exists
        assert Inventory.query.filter_by(beneficiary_id=beneficiary.id).count() == 1

        # Delete the beneficiary and confirm cascade deletion of inventory
        db.session.delete(beneficiary)
        db.session.commit()

        assert Inventory.query.filter_by(beneficiary_id=beneficiary.id).count() == 0