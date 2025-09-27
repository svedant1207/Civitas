import random
from faker import Faker
from app import create_app
from extensions import db
from models import Role, User, Property, Vehicle, Complaint
from werkzeug.security import generate_password_hash

# --- CONFIGURATION ---
NUM_USERS = 120
NUM_COMPLAINTS = 30
# ---------------------

fake = Faker()


def seed_data():
    """Generates fake data and populates the database."""
    app = create_app()
    with app.app_context():
        # Clean up existing data
        print("Deleting old data...")
        db.drop_all()
        db.create_all()
        print("Creating new tables...")

        # --- CREATE ROLES ---
        roles = [Role(name='Admin'), Role(name='Standard Member'), Role(name='Tenant')]
        db.session.add_all(roles)
        db.session.commit()
        print(f"Created {len(roles)} roles.")

        # --- CREATE USERS ---
        users = []
        # Use sets to ensure uniqueness
        used_emails = set()
        used_phones = set()

        for _ in range(NUM_USERS):
            # Ensure email and phone are unique
            email = fake.unique.email()
            phone = fake.unique.phone_number()

            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                password_hash=generate_password_hash('password123'),
                email=email,
                address=fake.address(),
                phone=phone,
                is_active=random.choice([True, False]),
                is_verified=True,
                role_id=random.choice([r.id for r in roles])
            )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()
        print(f"Created {len(users)} users.")

        # --- CREATE PROPERTIES, VEHICLES, AND COMPLAINTS ---
        properties = []
        vehicles = []
        complaints = []

        # Use sets for unique flat numbers and license plates
        used_flats = set()
        used_plates = set()

        for user in users:
            # Create a property for each user
            flat_num = f"{random.choice(['A', 'B', 'C', 'D'])}-{random.randint(101, 1205)}"
            if flat_num not in used_flats:
                properties.append(Property(flat_number=flat_num, block_name=flat_num.split('-')[0], owner_id=user.id,
                                           size_sq_ft=random.uniform(800.0, 2500.0)))
                used_flats.add(flat_num)

            # Create a vehicle for about half the users
            if random.random() > 0.5:
                plate = fake.unique.license_plate()
                # --- FIX IS HERE ---
                vehicles.append(Vehicle(
                    license_plate=plate,
                    make=fake.company(),  # <-- CHANGED
                    model=fake.word().capitalize(),  # <-- CHANGED
                    color=fake.color_name(),
                    owner_id=user.id
                ))

        # Create some complaints from random users
        for _ in range(NUM_COMPLAINTS):
            complaints.append(Complaint(
                title=fake.sentence(nb_words=4),
                description=fake.paragraph(nb_sentences=3),
                status=random.choice(['Open', 'In Progress', 'Resolved']),
                complainant_id=random.choice([u.id for u in users])
            ))

        db.session.add_all(properties)
        db.session.add_all(vehicles)
        db.session.add_all(complaints)
        db.session.commit()

        print(f"Created {len(properties)} properties.")
        print(f"Created {len(vehicles)} vehicles.")
        print(f"Created {len(complaints)} complaints.")

        print("\nDatabase has been successfully seeded! 🌱")


if __name__ == '__main__':
    seed_data()