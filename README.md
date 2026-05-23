# RBAC Task API

A secure REST API implementing JWT authentication, role-based access control, and protected task management — built with FastAPI, SQLAlchemy, and SQLite.

## Live Demo

- Frontend: https://rbac-task-api.netlify.app/
- Backend API: https://rbac-task-api-fastapi.onrender.com/
- Swagger Docs: https://rbac-task-api-fastapi.onrender.com/docs

> Note: Backend is on Render's free tier — first request may take 30–60 seconds due to cold start.

## Tech Stack

**Backend:** Python, FastAPI, SQLAlchemy, SQLite

**Auth:** JWT, bcrypt

**Frontend:** HTML, CSS, Vanilla JavaScript

**Deployment:** Netlify (Frontend), Render (Backend)

## Features

**Authentication**
- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication with token expiration
- Protected routes via dependency injection

**Role-Based Access Control**
- User — manages own tasks only
- Admin — access to all tasks
- Proper 401 (unauthenticated) vs 403 (unauthorized) handling
- Ownership enforcement on task operations

**Task Management**
- Create, read, update, and delete tasks
- Ownership-aware task listing
- Role-aware access on all endpoints

**API**
- Swagger UI with Bearer token authorization
- OpenAPI schema auto-generated
- API versioning (`/api/v1`)

## Project Structure

```
backend-rbac-api/
│
├── app/
│   ├── api/
│   │   ├── deps.py
│   │   └── v1/
│   │       ├── auth.py
│   │       └── tasks.py
│   ├── core/
│   │   └── security.py
│   ├── db/
│   │   ├── database.py
│   │   └── models.py
│   ├── schemas/
│   │   ├── user_schema.py
│   │   └── task_schema.py
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   └── app.js
│
├── requirements.txt
└── README.md
```

## API Endpoints

**Auth**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login and get JWT |

**Tasks (Protected)**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/tasks/ | Create task |
| GET | /api/v1/tasks/ | List tasks (ownership-aware) |
| GET | /api/v1/tasks/{id} | Get single task |
| PUT | /api/v1/tasks/{id} | Update task |
| DELETE | /api/v1/tasks/{id} | Delete task |

## Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/karthiknani229-art/rbac-task-api-fastapi.git
cd backend-rbac-api
```

**2. Create and activate virtual environment**

```bash
python -m venv venv

# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Start the server**

```bash
uvicorn app.main:app --reload
```

Server runs at: http://127.0.0.1:8000

Swagger docs at: http://127.0.0.1:8000/docs

**5. Open frontend**

Open `frontend/index.html` directly in your browser.

## API Usage Flow

1. Register via `POST /api/v1/auth/register`
2. Login via `POST /api/v1/auth/login` and copy the JWT
3. In Swagger: click Authorize → paste `Bearer <token>`
4. Use protected task endpoints

## Design Decisions

**Modular layered architecture** — routes, dependencies, schemas, and models are fully separated for maintainability and testability.

**Stateless JWT** — enables horizontal scaling without shared session state.

**SQLAlchemy abstraction** — switching from SQLite to PostgreSQL or MySQL requires only a connection string change.

**API versioning** — all endpoints under `/api/v1` for forward compatibility.

## Future Improvements

- Refresh token mechanism
- Pagination for task listing
- Redis caching layer
- Docker containerization
- Unit and integration tests
- Rate limiting

## Author

Penta Karthik — [GitHub](https://github.com/karthiknani229-art)
