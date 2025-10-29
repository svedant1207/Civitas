from flask import Blueprint, request, jsonify
from models import User, Role
from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    """Registers a new user."""
    data = request.get_json()
    if not data or not all(k in data for k in ('email', 'password', 'first_name', 'last_name', 'address', 'phone')):
        return jsonify({'error': 'Missing required fields'}), 400

    # --- FIX: CHECK FOR BOTH EMAIL AND PHONE ---
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email address already in use'}), 409

    if User.query.filter_by(phone=data.get('phone')).first():
        return jsonify({'error': 'Phone number already in use'}), 409
    # --- END OF FIX ---

    member_role = Role.query.filter_by(name='Standard Member').first()
    if not member_role:
        # Create default roles if they don't exist
        admin_role = Role(name='Admin')
        member_role = Role(name='Standard Member')
        db.session.add_all([admin_role, member_role])
        db.session.commit()

    hashed_password = generate_password_hash(data.get('password'))

    new_user = User(
        email=data.get('email'),
        password_hash=hashed_password,
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        address=data.get('address'),
        phone=data.get('phone'),
        role_id=member_role.id,
        is_active=True,
        is_verified=True  # Auto-verify for simplicity
    )
    db.session.add(new_user)
    db.session.commit()

    # Convert the new user to a dictionary for the JSON response
    user_dict = new_user.to_dict()
    return jsonify(user_dict), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Logs in a user."""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data.get('email')).first()
    if not user or not check_password_hash(user.password_hash, data.get('password')):
        return jsonify({"error": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)
