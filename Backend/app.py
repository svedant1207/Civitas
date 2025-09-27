from flask import Flask
from extensions import db


def create_app():
    """Creates and configures the Flask application."""
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with the app
    db.init_app(app)

    # --- Import and register Blueprints inside the factory ---
    from routes.complaints import complaints_bp
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