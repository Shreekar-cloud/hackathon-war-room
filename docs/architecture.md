# Architecture

```text
Browser (React + Vite)
        |
        | HTTP / JSON
        v
FastAPI service
        |
        | server-side Supabase client
        v
Supabase Postgres
```

- The browser talks only to FastAPI.
- FastAPI owns server-side secrets and talks to Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed as a `VITE_` variable.
- The demo project endpoints use in-memory storage if Supabase is not configured. This fallback is ephemeral and only intended for local UI development.

## Extension points

- `frontend/src/components/`: reusable UI components
- `frontend/src/services/`: API clients
- `backend/app/routes/`: HTTP endpoints
- `backend/app/services/`: business logic and integrations
- `backend/app/models/`: request/response schemas
- `supabase/`: SQL migrations and policies
