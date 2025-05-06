from app.models import Charity
from app import db

def test_create_charity(app):
    with app.app_context():
        charity = Charity(
            user_id=1,
            full_name="Helping Hands",
            contact="0700123456",
            email="help@hands.org",
            description="We help people",
            website_url="https://helpinghands.org"
        )
        db.session.add(charity)
        db.session.commit()

        assert charity.id is not None
        assert charity.full_name == "Helping Hands"
