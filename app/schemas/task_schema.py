# app/schemas/task_schema.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True