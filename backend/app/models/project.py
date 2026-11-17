from datetime import datetime, timezone
from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str = Field(default="", max_length=1000)


class Project(ProjectCreate):
    id: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
