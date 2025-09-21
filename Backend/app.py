from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database object
db = SQLAlchemy(app)

from routes.complaints import complaints_bp
app.register_blueprint(complaints_bp, url_prefix='/api/complaints')

# --- OLD CODE KEPT FOR REFERENCE ---
@app.route('/')
def home():
    return '<h1>Backend is running!</h1>'

if __name__ == '__main__':
    # Import all models to register them with SQLAlchemy
    from models import User, Role, Property, Vehicle, Complaint

    with app.app_context():
        db.create_all()
        print("Database tables created or already exist.")

    app.run(debug=True)