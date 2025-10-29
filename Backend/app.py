from flask import Flask
from extensions import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# --- Create Instances ---
jwt = JWTManager()

def create_app():
    """Creates and configures the Flask application."""
    app = Flask(__name__)

    # --- Enable CORS ---
    # Allow requests specifically from your frontend's origin
    # If your frontend runs on a different port, change "5173"
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # --- Configuration ---
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'a-strong-secret-key'
    app.config['JWT_SECRET_KEY'] = 'another-strong-jwt-secret-key'

    # --- Initialize Extensions ---
    db.init_app(app)
    jwt.init_app(app)

    # --- Import and Register Blueprints ---
    from routes.auth import auth_bp
    from routes.complaints import complaints_bp
    from routes.notices import notices_bp
    from routes.payments import payments_bp
    from routes.residents import residents_bp

    # Register blueprints with their URL prefixes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(complaints_bp, url_prefix='/api/complaints')
    app.register_blueprint(notices_bp, url_prefix='/api/notices')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    app.register_blueprint(residents_bp, url_prefix='/api/residents')

    @app.route('/')
    def home():
        return '<h1>Civitas Backend is running!</h1>'

    return app

# This block runs when you execute "python app.py"
if __name__ == '__main__':
    app = create_app()

    # Create database tables if they don't exist
    with app.app_context():
        # Import all models here before creating tables
        from models import User, Role, Property, Vehicle, Complaint, Payment, Notice
        db.create_all()
        print("Database tables created or already exist.")

    app.run(debug=True)

