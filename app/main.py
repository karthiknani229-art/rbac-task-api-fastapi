from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine
from app.db import models
from app.api.v1.auth import router as auth_router
from app.api.v1.tasks import router as tasks_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="RBAC Task API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(tasks_router)