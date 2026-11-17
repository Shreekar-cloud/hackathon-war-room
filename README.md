# Hackathon War Room

A reusable hackathon starter: **React + Vite + FastAPI + Supabase**.

Designed to get a team from problem statement to a working demo quickly. It includes a small example feature (projects/ideas), a backend health endpoint, optional Supabase persistence, environment templates, Docker Compose, and GitHub Actions CI.

## Stack

- Frontend: React, Vite, JavaScript
- Backend: Python, FastAPI, Pydantic
- Database: Supabase (Postgres) via `supabase-py`
- Local orchestration: Docker Compose
- CI: GitHub Actions

## Quick start (local)

### 1. Requirements

- Node.js 20+
- Python 3.11+
- A Supabase project (optional for the API health check; required for persistence)

### 2. Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env` to enable server-side database access.
Set `VITE_API_BASE_URL=http://localhost:8000` in `frontend/.env`.

**Never put the Supabase service-role key in the frontend.** It bypasses Row Level Security and must remain server-side.

### 3. Create the database table

In Supabase Dashboard → SQL Editor, run `supabase/schema.sql`.

### 4. Start the backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

### 5. Start the frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

## Run with Docker

Copy the environment templates first, then from the repository root:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs

Docker Compose starts the app services only; Supabase is a hosted service configured through environment variables.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness and Supabase configuration status |
| GET | `/api/projects` | List demo projects |
| POST | `/api/projects` | Create a demo project |

If Supabase credentials are absent, the project endpoints use a small in-memory fallback for local UI development. Data in fallback mode is lost when the backend restarts. This is not production persistence.

## Publish as a public GitHub repository

1. Create a **new public repository** on GitHub named `hackathon-war-room`.
2. Do not initialize it with a README, license, or `.gitignore` (this folder already contains them).
3. In this folder, run:

```bash
git init
git add .
git commit -m "Initial hackathon starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hackathon-war-room.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. GitHub CLI also works:

```bash
gh repo create hackathon-war-room --public --source=. --remote=origin --push
```

## Adapt it to a problem statement

1. Replace the sample `Project` model and `/api/projects` routes with your domain entities.
2. Add domain-specific UI in `frontend/src/`.
3. Add business logic under `backend/app/services/`.
4. Add new tables and policies in `supabase/`.
5. Update this README with the problem, target users, demo flow, and setup instructions.

## Suggested 24-hour workflow

- Hours 0–2: define user, pain point, MVP, and demo story.
- Hours 2–10: implement one end-to-end user journey.
- Hours 10–17: add the differentiating feature and test.
- Hours 17–22: polish, deploy, and rehearse the demo.
- Hours 22–24: freeze features, fix critical bugs, and pitch.

## Security checklist before deployment

- [ ] Keep `.env` files out of Git.
- [ ] Never expose `SUPABASE_SERVICE_ROLE_KEY` or other server secrets in Vite variables.
- [ ] Add Supabase Row Level Security policies appropriate to your user model.
- [ ] Add authentication and authorization before exposing user-specific data.
- [ ] Validate inputs and add rate limiting for public endpoints.
- [ ] Configure production CORS to your exact frontend origin.
- [ ] Rotate any secret that was accidentally committed.

## License

MIT. See [LICENSE](LICENSE).
