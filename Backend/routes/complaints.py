from flask import Blueprint, jsonify, request
from extensions import db
from models import Complaint
from flask_jwt_extended import jwt_required, get_jwt_identity

complaints_bp = Blueprint('complaints', __name__)

@complaints_bp.route('/', methods=['GET', 'POST'])
@jwt_required()
def handle_complaints():
    current_user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data:
            return jsonify({'error': 'Title and description are required.'}), 400
        new_complaint = Complaint(
            title=data['title'], description=data['description'],
            complainant_id=current_user_id
        )
        db.session.add(new_complaint)
        db.session.commit()
        return jsonify(new_complaint.to_dict()), 201
    else: # GET
        complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
        return jsonify([c.to_dict() for c in complaints])
