from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.db import models

from app.api.v1.auth import router as auth_router
from app.api.v1.tasks import router as tasks_router

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI(
    title="RBAC Task API",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS (allow frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with Netlify URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with proper prefixes
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(tasks_router, prefix="/api/v1/tasks", tags=["Tasks"])

# Root route (for health check)
@app.get("/")
def root():
    return {"message": "RBAC Task API is running 🚀"}