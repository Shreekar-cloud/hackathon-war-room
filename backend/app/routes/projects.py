from fastapi import APIRouter, HTTPException
from app.models.project import ProjectCreate
from app.services.project_service import create_project, list_projects

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("")
def get_projects():
    try:
        return {"items": list_projects()}
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Could not load projects. Check Supabase configuration and schema.") from exc


@router.post("", status_code=201)
def post_project(payload: ProjectCreate):
    try:
        return create_project(payload)
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Could not save project. Check Supabase configuration and schema.") from exc
