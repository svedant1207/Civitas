from flask import Blueprint, jsonify, request
from extensions import db
from models import Payment, User
from flask_jwt_extended import jwt_required
from datetime import datetime

# Create a Blueprint for payment-related routes
payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/', methods=['GET', 'POST'])
def handle_payments():
    """Handles fetching all payments or creating a new one."""
    if request.method == 'POST':
        data = request.get_json()
        if not data or not all(k in data for k in ('amount', 'user_id', 'description')):
            return jsonify({'error': 'Missing data. Amount, user_id, and description are required.'}), 400

        # Verify the user exists
        if not User.query.get(data['user_id']):
            return jsonify({'error': 'User not found.'}), 404

        new_payment = Payment(
            amount=data['amount'],
            description=data['description'],
            user_id=data['user_id'],
            status=data.get('status', 'Pending') # Default status to 'Pending'
        )
        db.session.add(new_payment)
        db.session.commit()
        return jsonify(new_payment.to_dict()), 201
    else:
        # GET all payments
        payments = Payment.query.all()
        return jsonify([p.to_dict() for p in payments])

@payments_bp.route('/<int:payment_id>', methods=['GET', 'PUT'])
@jwt_required()
def handle_payment(payment_id):
    """Handles operations for a single payment."""
    payment = Payment.query.get_or_404(payment_id)

    if request.method == 'GET':
        return jsonify(payment.to_dict())

    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Update payment status or amount
        payment.status = data.get('status', payment.status)
        payment.amount = data.get('amount', payment.amount)
        payment.description = data.get('description', payment.description)

        db.session.commit()
        return jsonify(payment.to_dict())

@payments_bp.route('/user/<int:user_id>', methods=['GET'])
def get_payments_by_user(user_id):
    """Gets all payments for a specific user."""
    user = User.query.get_or_404(user_id)
    payments = Payment.query.filter_by(user_id=user.id).all()
    return jsonify([p.to_dict() for p in payments])
