from uuid import uuid4
from app.core.supabase import get_supabase_client
from app.models.project import Project, ProjectCreate

# Local fallback is for quick UI development only; it is not durable storage.
_memory_projects: list[dict] = []


def list_projects() -> list[dict]:
    client = get_supabase_client()
    if client:
        response = client.table("projects").select("*").order("created_at", desc=True).execute()
        return response.data or []
    return list(reversed(_memory_projects))


def create_project(payload: ProjectCreate) -> dict:
    row = {"id": str(uuid4()), "name": payload.name, "description": payload.description}
    client = get_supabase_client()
    if client:
        response = client.table("projects").insert(row).execute()
        return response.data[0] if response.data else row
    _memory_projects.append(row)
    return row
