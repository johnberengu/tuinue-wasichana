import os
from dotenv import load_dotenv
import pytest
from app import create_app, db as _db

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env.test'))

TEST_DATABASE_URI = os.getenv('TEST_DATABASE_URL')

@pytest.fixture(scope='session')
def app():
    os.environ['DATABASE_URL'] = TEST_DATABASE_URI  
    app = create_app()
    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': TEST_DATABASE_URI,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })

    with app.app_context():
        _db.drop_all()
        _db.create_all()
        yield app
        _db.session.remove()
        _db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
