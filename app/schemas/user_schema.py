# app/schemas/user_schema.py

from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True  # for SQLAlchemy compatibility