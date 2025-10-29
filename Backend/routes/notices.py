from flask import Blueprint, jsonify
from models import Notice
from flask_jwt_extended import jwt_required

# This line creates the 'notices_bp' variable that app.py needs
notices_bp = Blueprint('notices', __name__)

@notices_bp.route('/', methods=['GET'])
@jwt_required()
def get_notices():
    notices = Notice.query.order_by(Notice.created_at.desc()).all()
    return jsonify([{'id': n.id, 'title': n.title, 'body': n.body, 'created_at': n.created_at.isoformat()} for n in notices])
