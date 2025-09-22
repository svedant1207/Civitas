# 🏡 Civitas — Society Management App

Civitas is a **society management application** that simplifies managing residential communities.  
It handles residents, maintenance billing, tickets/complaints, notices, and visitors — all in one platform.

![Flask](https://img.shields.io/badge/Backend-Flask-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 👥 **Resident & Unit Management** – Add, link, and manage residents with their flats/units.  
- 💰 **Maintenance & Payments** – Generate invoices, track dues, and manage settlements.  
- 🛠️ **Tickets/Complaints** – Raise, track, and resolve issues seamlessly.  
- 📢 **Noticeboard** – Broadcast society-wide announcements.  
- 🛡️ **Visitors & Security** – Log visitor entries and approvals.  
- 🔑 **Role-based Access** – Separate Admin and Resident functionalities.  

---

## 🚀 Getting Started

### Backend (Flask)

cd Backend
# (Optional) create a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# set Flask app entrypoint (update if your main file differs)
export FLASK_APP=app.py          # Linux/Mac
set FLASK_APP=app.py             # Windows PowerShell

# run the development server (default port: 5000)
flask run --debug

# Backend now available at: http://127.0.0.1:5000

### Frontend (React)

Frontend planned in `frontend/` using React ⚛️.

---

## 🤝 Contributing

1. Fork this repository  
2. Create a new branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m "Add some feature"`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

---
