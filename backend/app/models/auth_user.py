from datetime import datetime
from flask_login import UserMixin
from flask_bcrypt import Bcrypt
from app.db import db
from itsdangerous import URLSafeTimedSerializer as Serializer
from app.extensions import login_manager

bcrypt = Bcrypt()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    charity = db.relationship('Charity', back_populates='user', uselist=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    @staticmethod
    def verify_reset_token(token):
        s = Serializer('SECRET_KEY')
        try:
            data = s.loads(token, max_age=3600, salt='reset-password')
            user_id = data['user_id']
        except Exception:
            return None
        return User.query.get(user_id)