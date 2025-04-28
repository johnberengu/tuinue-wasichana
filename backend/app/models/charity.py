from..db import db

class Charity(db.Model):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.string(100), nullable=False)
    description = db.Column(db.String(500))
    beneficiary_story = db.Column(db.String(500))

    def __repr__(self):
        return f'<Charity {self.name}>'


