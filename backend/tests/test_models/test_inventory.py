import pytest
from app import create_app, db
from app.models import Inventory, Beneficiary, Charity, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

@pytest.fixture(scope='module')
def test_app():
    app = create_app('testing')
    with app.app_context():
        yield app

@pytest.fixture(scope='function')
def init_database(test_app):
    with test_app.app_context():
        db.create_all()

        user = User(username="testuser", email="test@example.com", password="hashed")
        db.session.add(user)
        db.session.flush()

        charity = Charity(full_name="Test Charity", user_id=user.id, contact="0712345678", email="test@charity.com")
        db.session.add(charity)
        db.session.flush()

        beneficiary = Beneficiary(name="John Doe", location="Nairobi", charity_id=charity.id)
        db.session.add(beneficiary)
        db.session.flush()

        inventory = Inventory(item_name="Sanitary Pads", quantity=100, beneficiary_id=beneficiary.id, charity_id=charity.id)
        db.session.add(inventory)
        db.session.commit()

        yield db

        db.session.remove()
        db.drop_all()




def test_inventory_creation(init_database):
    """Test that an inventory item is created correctly."""
    inventory = Inventory.query.filter_by(item_name="Sanitary Pads").first()
    assert inventory is not None, "Inventory item should exist"
    assert inventory.item_name == "Sanitary Pads"
    assert inventory.quantity == 100
    assert inventory.beneficiary.name == "John Doe"
    assert inventory.beneficiary.location == "Nairobi"
    assert inventory.charity.full_name == "Test Charity"

def test_inventory_serialization(init_database):
    """Test that an inventory item is serialized correctly."""
    inventory = Inventory.query.filter_by(item_name="Sanitary Pads").first()
    serialized = inventory.serialize()
    assert serialized['id'] == inventory.id
    assert serialized['beneficiary_id'] == inventory.beneficiary_id
    assert serialized['item_name'] == "Sanitary Pads"
    assert serialized['quantity'] == 100
