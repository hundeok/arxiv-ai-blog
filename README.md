# ArXiv Translator AI

Daily Korean-language explainers for recent arXiv AI papers. The frontend is a Vite + React static site; the backend fetches papers, extracts PDF text, and writes generated Markdown into the frontend's public content directory.

## Local development

```bash
cd frontend
npm ci
npm run dev
```

Run `npm run build` before deploying to verify the production bundle.

## Generate paper content

Never put an API key in a Python file. Copy `.env.example` to `.env`, set `GEMINI_API_KEY`, then run:

```bash
python -m pip install -r backend/requirements.txt
cd backend
python process_content.py
```

The scheduled GitHub Actions workflow reads `GEMINI_API_KEY` from the repository's Actions secrets and commits generated content automatically.

## Deployment

Import the repository in Vercel with `frontend` as the Root Directory. Vercel uses the `npm run build` script and deploys the generated static site. No Gemini key is required in Vercel because generation happens in GitHub Actions.
