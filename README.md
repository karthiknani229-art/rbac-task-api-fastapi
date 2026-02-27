RBAC Task API — Scalable Backend with JWT Authentication

Author: Penta Karthik  
Role Applied: Backend Developer Intern  
Tech Stack: FastAPI, SQLAlchemy, SQLite, JWT, Vanilla JS

---

 Overview

This project is a secure and scalable REST API implementing:

- User Authentication (JWT + bcrypt)
- Role-Based Access Control (RBAC)
- Protected CRUD operations on Tasks
- Production-style modular architecture
- Interactive API documentation (Swagger)
- Basic frontend integration

The system demonstrates end-to-end backend engineering practices expected in real-world services.

---

 Features

Authentication
- User registration
- Secure password hashing (bcrypt)
- JWT-based login
- Token expiration handling
- Protected routes

 Role-Based Access Control
- User→ manages own tasks
- Admin → can access all tasks
- Proper 401 vs 403 handling

 Task Management (CRUD)
- Create task
- List tasks (ownership-aware)
- Get single task
- Update task
- Delete task

 Frontend (Supportive)
- Register & Login UI
- JWT stored in localStorage
- Protected dashboard
- Task creation & listing
- Error/success feedback

API Documentation
- Swagger UI available
- OpenAPI schema generated
- Bearer token authorization supported

---

Project Structure


backend-rbac-api/
│
├── app/
│ ├── api/
│ │ ├── deps.py
│ │ └── v1/
│ │ ├── auth.py
│ │ └── tasks.py
│ │
│ ├── core/
│ │ └── security.py
│ │
│ ├── db/
│ │ ├── database.py
│ │ └── models.py
│ │
│ ├── schemas/
│ │ ├── user_schema.py
│ │ └── task_schema.py
│ │
│ └── main.py
│
├── frontend/
│ ├── index.html
│ ├── dashboard.html
│ └── app.js
│
├── requirements.txt
└── README.md


---

 Setup Instructions

 Clone repository

bash
git clone <your-repo-link>
cd backend-rbac-api
2️⃣ Create virtual environment
python -m venv venv

Activate:

Windows

.\venv\Scripts\activate

Mac/Linux

source venv/bin/activate
3️⃣ Install dependencies
pip install -r requirements.txt
4️⃣ Run backend server
uvicorn app.main:app --reload

Backend will run at:

http://127.0.0.1:8000
5️⃣ Open Swagger Docs
http://127.0.0.1:8000/docs
6️⃣ Run Frontend

Open in browser:

frontend/index.html
 API Usage Flow
Step 1 — Register
POST /api/v1/auth/register
Step 2 — Login
POST /api/v1/auth/login

Copy the returned JWT.

Step 3 — Authorize

In Swagger:

Authorize → Bearer <token>
Step 4 — Use Protected Task APIs
POST   /api/v1/tasks/
GET    /api/v1/tasks/
GET    /api/v1/tasks/{id}
PUT    /api/v1/tasks/{id}
DELETE /api/v1/tasks/{id}
 Security Features

bcrypt password hashing

JWT authentication with expiry

Protected route dependencies

Role-based authorization

Ownership enforcement

Proper HTTP status codes

 Scalability Considerations

The project is designed with scalability in mind:

Modular layered architecture

Stateless JWT authentication (horizontal scaling friendly)

Database abstraction via SQLAlchemy

Easy migration to Postgres/MySQL

Ready for Redis caching integration

Can be containerized with Docker

API versioning implemented (/api/v1)

 Future Improvements

Refresh token mechanism

Pagination for tasks

Redis caching layer

Docker containerization

Unit & integration tests

Role management UI

Rate limiting

 Assignment Requirements Mapping
Requirement	Status
JWT Authentication	
Password Hashing	
RBAC	
Protected CRUD	
API Versioning	
Error Handling	
Swagger Docs	
Database Schema	
Basic Frontend	




Author

Penta Karthik