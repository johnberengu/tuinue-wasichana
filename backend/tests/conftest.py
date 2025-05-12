import os
import pytest
from dotenv import load_dotenv
from app import create_app, db as _db
from sqlalchemy.orm import scoped_session, sessionmaker  # Add sessionmaker import

# Load environment variables from .env.test file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env.test'))

# Ensure the test database URI is correctly retrieved from the environment variables
TEST_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'postgresql://localhost:5432/tuinue_test')  # Fallback to default URI if not found

@pytest.fixture(scope='session')
def app():
    os.environ['DATABASE_URL'] = TEST_DATABASE_URI
    
    app = create_app()

    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': TEST_DATABASE_URI,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })

    return app

@pytest.fixture(scope='session')
def db(app):
    with app.app_context():
        _db.drop_all()
        _db.create_all()
        yield _db
        _db.session.remove()
        _db.drop_all()

@pytest.fixture(scope='function')
def session(db):
    connection = db.engine.connect()
    transaction = connection.begin()

    # Use the imported sessionmaker here
    test_session = scoped_session(sessionmaker(bind=connection))
    db.session = test_session

    yield test_session

    transaction.rollback()
    connection.close()
    test_session.remove()  # Use test_session.remove() instead of db.session.remove()

@pytest.fixture
def client(app):
    """Flask test client for sending requests."""
    return app.test_client()
