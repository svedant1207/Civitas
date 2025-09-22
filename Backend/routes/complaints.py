from flask import Blueprint, jsonify
from extensions import db
from models import Complaint

# Created a Blueprint instance for complaints.
complaints_bp = Blueprint('complaints', __name__)


@complaints_bp.route('/', methods=['GET'])
def get_complaints():
    """Fetches all complaints from the database and returns them as JSON."""

    # Query all complaints.
    complaints = Complaint.query.all()

    # Convert each Complaint object into a dictionary and return as JSON.
    return jsonify([c.to_dict() for c in complaints])