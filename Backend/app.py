from flask import Flask
from extensions import db
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect()


def create_app():
    """Creates and- configures the Flask application."""
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'wow'

    # Initialize extensions with the app
    db.init_app(app)
    csrf.init_app(app)

    # --- THE FIX ---
    # 1. First, import the blueprint so the variable exists.
    from routes.complaints import complaints_bp

    # 2. Now that 'complaints_bp' exists, you can exempt it.
    csrf.exempt(complaints_bp)

    # 3. Finally, register the blueprint with the app.
    app.register_blueprint(complaints_bp, url_prefix='/api/complaints')

    @app.route('/')
    def home():
        return '<h1>Backend is running!</h1>'

    return app


# This block only runs when you execute "python app.py" directly
if __name__ == '__main__':
    app = create_app()

    # The app context is needed to run db.create_all()
    with app.app_context():
        # We import the models here right before we need them
        from models import User, Role, Property, Vehicle, Complaint

        db.create_all()
        print("Database tables created or already exist.")

    app.run(debug=True)