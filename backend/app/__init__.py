from flask import Flask
from .db import db
from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Setup config, database, and CORS (if needed)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/your_db_name'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'your_secret_key'

    db.init_app(app)

    app.register_blueprint(charity_bp)
    app.register_blueprint(story_bp)


    with app.app_context():
        db.create_all()

    return app
