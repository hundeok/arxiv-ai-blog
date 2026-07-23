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

## Observability

The production GA4 property is configured with measurement ID `G-V4G2FBSDMG`.
The tag is present both in the React application and in generated static paper
pages, so visits from Google Search are measured as well as in-app navigation.

| Event | Meaning | Key parameter |
| --- | --- | --- |
| `page_view` | Any home or paper page view | `page_path` |
| `paper_open` | A visitor clicked a paper card on the home page | `paper_id` |
| `paper_view` | A paper article was displayed, including direct search visits | `paper_id` |

Use **GA4 → Reports → Realtime** to validate a deployment. Standard reports
normally take up to 24 hours to populate. In Search Console, submit only
`/sitemap-index.xml`; it references the generated `/sitemap.xml`. The pipeline
regenerates both files and `robots.txt` on every successful publication run.
