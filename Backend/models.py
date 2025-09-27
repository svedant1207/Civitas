from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow, nullable=False, default=datetime.utcnow)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    # Relationships
    role = db.relationship('Role', backref='users', lazy=True)
    owned_property = db.relationship('Property', backref='owner', lazy=True, uselist=False)
    vehicles = db.relationship('Vehicle', backref='owner', lazy=True)
    complaints = db.relationship('Complaint', backref='complainant', lazy=True)

    def __repr__(self):
        return f'User - {self.first_name} {self.last_name}'


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f'<Role {self.name}>'


class Property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    flat_number = db.Column(db.String(20), unique=True, nullable=False)
    block_name = db.Column(db.String(50))
    size_sq_ft = db.Column(db.Float)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Property {self.flat_number}>'


class Vehicle(db.Model):
    __tablename__ = 'vehicles'
    id = db.Column(db.Integer, primary_key=True)
    license_plate = db.Column(db.String(50), unique=True, nullable=False)
    make = db.Column(db.String(50))
    model = db.Column(db.String(50))
    color = db.Column(db.String(50))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Vehicle {self.license_plate}>'


class Complaint(db.Model):
    __tablename__ = 'complaints'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='Open', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    complainant_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f'<Complaint {self.title}>'

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.isoformat(), # isoformat() converts datetime to a string
            'complainant_id': self.complainant_id
        }