# Github-Roster

A small project that analyzes GitHub profiles and (optionally) generates humorous "roasts" using a backend AI/ML service. The repository contains a Next.js frontend template under `my-nextjs-template/` and some Python utilities for interacting with the GitHub API.

This README explains the repository layout, how to run the frontend locally, and how to provide or create the missing Flask backend that the frontend expects.

## Quick summary

- Frontend: `my-nextjs-template/` — Next.js (App Router), TypeScript, Tailwind CSS
- Backend: expected under `my-nextjs-template/flask_backend/` — Flask (Python). Note: the Flask application files are not checked into this repo; only a `venv/` folder is present. See "Backend — missing files" below.
- Utilities: `main.py` and `github_api.py` — small Python scripts that use PyGithub to fetch GitHub profile data.

## Project structure (important files)

- `main.py` — CLI example that fetches GitHub profile data (requires `GITHUB_TOKEN`).
- `github_api.py` — alternative script to fetch GitHub data.
- `my-nextjs-template/package.json` — frontend package manifest and scripts (`dev`, `build`, `start`, `lint`).
- `my-nextjs-template/PROJECT_SETUP.md` — detailed project notes and setup instructions (read this when setting up the backend).
- `my-nextjs-template/src/` — Next.js app code (components, API routes, services).
  - `src/services/api.ts` — client-side service that expects a Flask backend at `NEXT_PUBLIC_FLASK_API_URL` (default `http://localhost:5000`).
  - `src/app/api/roast/route.ts` and `src/app/api/health/route.ts` — Next.js API routes that proxy to the Flask backend.

## What I found when analyzing the repo

- The frontend code is present and runnable. It expects a Flask backend exposing endpoints like `/api/roast`, `/api/profile/:username`, and `/health` at `http://localhost:5000` by default.
- The expected `my-nextjs-template/flask_backend/` folder in this repo does not contain the Flask app source files (there's only a `venv/` directory). That means the backend must be added or re-created before the full application (frontend+backend) can work.

## Run the frontend (Next.js)

These commands are for Windows PowerShell (your default shell). From the repository root:

```powershell
cd .\my-nextjs-template
npm install
npm run dev
```

The frontend will run on http://localhost:3000 by default.

Environment variables used by the frontend

- NEXT_PUBLIC_FLASK_API_URL — URL for the Flask backend (default: `http://localhost:5000`).

You can create a `.env.local` file in `my-nextjs-template/` with:

```text
NEXT_PUBLIC_FLASK_API_URL=http://localhost:5000
```

## Backend — missing files (what to do)

The repository's documentation (`PROJECT_SETUP.md`) expects a Flask backend at `my-nextjs-template/flask_backend/` with `app.py` and `requirements.txt`. However, those files are not present in the repository (only a `venv/` folder exists). You have three options:

1. If you have the original backend elsewhere, copy the Flask app files into `my-nextjs-template/flask_backend/`.

2. Recreate a minimal Flask backend using the interface the frontend expects. Example minimal server outline (create `my-nextjs-template/flask_backend/app.py`):

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({ 'status': 'ok', 'model_loaded': False, 'github_token_set': False })

@app.route('/api/roast', methods=['POST'])
def roast():
    payload = request.get_json() or {}
    username = payload.get('username')
    # TODO: implement GitHub fetch + AI roast generation
    return jsonify({ 'success': True, 'roast': f"(stub) Roast for {username}" })

@app.route('/api/profile/<username>', methods=['GET'])
def profile(username):
    # TODO: return GitHub profile data
    return jsonify({ 'success': True, 'profile': { 'username': username } })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

3. Use the `PROJECT_SETUP.md` inside `my-nextjs-template/` as guidance — it contains sample commands and notes about required Python packages (e.g., Flask, flask-cors, PyGithub, python-dotenv). Create a `requirements.txt` with packages you need.

Example `requirements.txt` to start with:

```
Flask>=2.0
flask-cors
PyGithub
python-dotenv
```

Run the backend (PowerShell):

```powershell
cd .\my-nextjs-template\flask_backend
python -m venv venv
. .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Note: if `app.py` and `requirements.txt` are missing, create them (see option 2).

## Running the Python utilities

`main.py` and `github_api.py` are small scripts that use a GitHub personal access token. Set the token in your environment or in a `.env` file (use `python-dotenv`):

Environment variable name: `GITHUB_TOKEN` (or `GH_TOKEN`).

Run `main.py` from PowerShell:

```powershell
python .\main.py
```

Follow the prompt to enter a GitHub username.

## Notes, caveats and recommendations

- The frontend proxies certain API routes to the Flask backend. If you don't run a backend, some front-end features (generate roast, view profile details) will show an error or fallback messaging.
- The repository contains helpful docs inside `my-nextjs-template/PROJECT_SETUP.md` and design notes in `DESIGN_SYSTEM.md` and `ROAST_OPTIONS.md`. Read them for implementation details.
- The `my-nextjs-template` frontend uses Next.js 15 and React 19 per `package.json`.
- The Flask backend is intentionally minimal in the template; it's expected you will integrate your own AI model or call out to an external API (Gemini, OpenAI, etc.) to generate the roast.

## How I validated this README

- I inspected `main.py`, `github_api.py`, `my-nextjs-template/package.json`, `my-nextjs-template/PROJECT_SETUP.md`, and key Next.js source files (`src/app/layout.tsx`, `src/services/api.ts`) to determine run scripts, expected endpoints, and environment variables.
- I confirmed the frontend is runnable with `npm run dev` and that the backend files referenced in docs are not present in the repo.

## Next steps (suggested)

1. Add or restore the Flask backend source files to `my-nextjs-template/flask_backend/` (app.py, requirements.txt, any model code).
2. Add a `flask_backend/README.md` explaining backend endpoints and environment variables.
3. Consider adding a minimal automated test (frontend health check + backend stub) to simplify onboarding.

If you want, I can: create a minimal `app.py` and `requirements.txt` in `my-nextjs-template/flask_backend/` (stub endpoints) and wire it up so the whole project runs end-to-end locally — tell me if you'd like that and I'll add the files and run quick validation.
