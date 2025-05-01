import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .db import db
from .extensions import bcrypt, login_manager

# Import blueprints
from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from .routes.donation_routes import donation_bp
from .routes.auth_routes import auth_bp

# Import models to register them with SQLAlchemy
from .models import Donor, Donation, User, Charity, Story, Inventory

migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donation_bp, url_prefix='/donations')
    app.register_blueprint(charity_bp, url_prefix='/charities')
    app.register_blueprint(story_bp, url_prefix='/stories')

    @app.route('/')
    def index():
        return 'API is working!'

    return app

app = create_app()
