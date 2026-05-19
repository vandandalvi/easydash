# GitHub One-Click Deploy (Vercel + Render)

This guide shows how to enable automatic deployments from GitHub using the provided GitHub Actions workflows.

## Configure GitHub repository

1. Push your repository to GitHub (if not already):

```bash
git remote add origin https://github.com/YOUR_USERNAME/internsh.git
git branch -M main
git push -u origin main
```

2. In the GitHub repo settings, go to **Secrets and variables** > **Actions** and add the following secrets:

- `RENDER_API_KEY` — Render API key (create at https://dashboard.render.com/account)
- `RENDER_SERVICE_ID` — Render service id for your backend (available in Render dashboard)
- `VERCEL_TOKEN` — Vercel personal token (create at https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` — Vercel org id (found in project settings)
- `VERCEL_PROJECT_ID` — Vercel project id (found in project settings)

3. Optional: Add other env var secrets used by your app (e.g., `MONGODB_URI`, `JWT_SECRET`) in your hosting platforms (Render/Vercel) rather than GitHub Actions.

## How it works

- Pushing to `main` will:
  - Build the frontend and deploy to Vercel via `frontend-deploy.yml`.
  - Build the backend and deploy to Render via `backend-deploy.yml`.

## Trigger a manual deploy

After configuring the secrets, push to `main` or create a new release. GitHub Actions will run and deploy automatically.

## Troubleshooting

- Check the Actions tab in GitHub for logs.
- For Render-specific logs, visit your Render service dashboard.
- For Vercel deployments, visit your Vercel project dashboard.

## Notes

- These workflows assume `main` branch deploys to production. Update the branch in the workflow if you use a different default branch.
- Keep your `RENDER_API_KEY` and `VERCEL_TOKEN` secret — do not commit them to the repo.
