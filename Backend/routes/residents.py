from flask import Blueprint, jsonify
from models import User
from flask_jwt_extended import jwt_required

residents_bp = Blueprint('residents', __name__)

@residents_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_residents():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
