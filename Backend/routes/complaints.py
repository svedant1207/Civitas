from flask import Blueprint, jsonify, request
from extensions import db
from models import Complaint, User

complaints_bp = Blueprint('complaints', __name__)


# Handles GET (all) and POST (create new) for the /complaints endpoint
@complaints_bp.route('/', methods=['GET', 'POST'])
def handle_complaints():
    if request.method == 'POST':
        # CREATE a new complaint
        data = request.get_json()
        if not data or not all(k in data for k in ('title', 'description', 'complainant_id')):
            return jsonify({'error': 'Missing data. Title, description, and complainant_id are required.'}), 400

        if not User.query.get(data['complainant_id']):
            return jsonify({'error': 'Complainant user not found.'}), 404

        new_complaint = Complaint(
            title=data['title'],
            description=data['description'],
            complainant_id=data['complainant_id']
        )
        db.session.add(new_complaint)
        db.session.commit()
        return jsonify(new_complaint.to_dict()), 201
    else:
        # READ all complaints
        complaints = Complaint.query.all()
        return jsonify([c.to_dict() for c in complaints])


# Handles GET (one), PUT (update), and DELETE for a specific complaint
@complaints_bp.route('/<int:complaint_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_complaint(complaint_id):
    # Find the specific complaint by its ID, or return a 404 error if it doesn't exist
    complaint = Complaint.query.get_or_404(complaint_id)

    if request.method == 'GET':
        # READ a single complaint
        return jsonify(complaint.to_dict())

    if request.method == 'PUT':
        # UPDATE an existing complaint
        data = request.get_json()

        # Update fields with new data if provided, otherwise keep the old data
        complaint.title = data.get('title', complaint.title)
        complaint.description = data.get('description', complaint.description)
        complaint.status = data.get('status', complaint.status)

        db.session.commit()
        return jsonify(complaint.to_dict())

    if request.method == 'DELETE':
        # DELETE a complaint
        db.session.delete(complaint)
        db.session.commit()
        return jsonify({'message': f'Complaint with ID {complaint_id} has been deleted.'})