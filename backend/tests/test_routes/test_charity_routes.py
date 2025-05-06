from app import db
from app.models import Charity

def test_get_all_charities(client, app):
    with app.app_context():
        db.session.add(Charity(
            user_id=1,
            full_name="Hope Org",
            contact="0711223344",
            email="hope@org.com"
        ))
        db.session.commit()

    response = client.get('/charities/')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)
    assert len(response.get_json()) > 0
