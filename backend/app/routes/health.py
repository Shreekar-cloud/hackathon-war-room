from fastapi import APIRouter
from app.core.config import get_settings
from app.core.supabase import get_supabase_client

router = APIRouter(tags=["health"])


@router.get("/health")
def health():
    settings = get_settings()
    return {
        "status": "ok",
        "app": settings.app_name,
        "environment": settings.environment,
        "supabase_configured": get_supabase_client() is not None,
    }
