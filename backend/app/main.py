from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.routes import health, projects

settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0", description="Reusable hackathon starter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(projects.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Hackathon War Room API is running", "docs": "/docs"}
