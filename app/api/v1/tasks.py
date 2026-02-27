from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.db import models
from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskOut
from app.api.deps import get_current_user
router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"]
)
@router.post("/", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = models.Task(
        title=task_data.title,
        description=task_data.description,
        owner_id=current_user.id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
@router.get("/", response_model=List[TaskOut])
def list_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role == "admin":
        tasks = db.query(models.Task).all()
    else:
        tasks = db.query(models.Task).filter(
            models.Task.owner_id == current_user.id
        ).all()

    return tasks
@router.get("/{task_id}", response_model=TaskOut)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    return task
@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description

    db.commit()
    db.refresh(task)

    return task
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(task)
    db.commit()

    return None
