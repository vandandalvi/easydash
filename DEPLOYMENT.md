# Deployment Guide: Vercel + Render

This guide walks you through deploying your Smart Leads Dashboard to **Vercel** (frontend) and **Render** (backend).

## Prerequisites

- GitHub account (recommended for CI/CD)
- Vercel account (https://vercel.com)
- Render account (https://render.com)
- MongoDB Atlas account with connection string

---

## Part 1: Render Deployment (Backend)

### Step 1: Push to GitHub

1. Initialize a git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/internsh.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Render

1. Go to [https://render.com](https://render.com)
2. Sign up or log in
3. Click **New+** > **Web Service**
4. Select **Connect a Repository**
5. Search for `internsh` and authorize Render

### Step 3: Configure Backend Service

- **Name**: `smart-leads-backend`
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Root Directory**: `backend`
- **Plan**: Free (or Pro if needed)

### Step 4: Add Environment Variables in Render

After creating the service, go to **Environment** tab and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong random secret (generate one) |
| `CLIENT_URL` | Your Vercel frontend URL (set after Vercel deploy) |

Example for `JWT_SECRET`:
```bash
# Generate a secure secret (run locally, then copy to Render)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy

- Render will auto-deploy when you push to main
- Your backend URL will be: `https://smart-leads-backend.render.com` (or similar)

---

## Part 2: Vercel Deployment (Frontend)

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in
3. Click **Add New...** > **Project**
4. Select your GitHub repository (`internsh`)
5. Click **Import**

### Step 3: Configure Build Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `.` (or leave blank)

### Step 4: Add Environment Variables in Vercel

Go to **Settings** > **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://smart-leads-backend.render.com/api` |

> Replace with your actual Render backend URL

### Step 5: Deploy

- Click **Deploy**
- Vercel will build and deploy your frontend
- Your frontend URL will be: `https://internsh.vercel.app` (or similar)

---

## Step 6: Update Backend CLIENT_URL

Now that you have your Vercel URL:

1. Go back to **Render** > Your backend service
2. Go to **Environment** tab
3. Update `CLIENT_URL` to your Vercel frontend URL:
   ```
   https://internsh.vercel.app
   ```
4. Click **Save** (Render will auto-redeploy)

---

## Step 7: Test the Deployment

1. Visit your Vercel frontend URL
2. Try logging in or creating a lead
3. Check that API calls go to your Render backend
4. Check Render logs if there are any issues

---

## Troubleshooting

### Frontend shows "Cannot connect to API"

- Check `VITE_API_BASE_URL` in Vercel settings
- Ensure the Render backend URL is correct and accessible
- Check CORS settings in backend `src/app.ts`

### Backend fails to start on Render

- Check logs: Render dashboard > Your service > Logs
- Verify `MONGODB_URI` is correct
- Ensure `NODE_ENV` is handled properly in your code

### MongoDB authentication fails

- Verify username and password in connection string
- Check IP whitelist in MongoDB Atlas (allow `0.0.0.0/0` for Render)
- Ensure database exists in MongoDB Atlas

### CORS errors between frontend and backend

- Update backend CORS config to include your Vercel URL:
  ```ts
  // src/app.ts
  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  }));
  ```

---

## Environment Variables Summary

### Backend (.env / Render)
- `PORT` - API port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT signing secret
- `CLIENT_URL` - Frontend URL (for CORS)

### Frontend (Vercel)
- `VITE_API_BASE_URL` - Backend API URL (e.g., `https://backend.render.com/api`)

---

## Local Development

To test locally before deploying:

1. **Backend**: Create `backend/.env` with:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
   JWT_SECRET=dev-secret
   CLIENT_URL=http://localhost:5173
   ```

2. **Start backend**:
   ```bash
   npm --prefix backend run dev
   ```

3. **Start frontend** (in another terminal):
   ```bash
   npm run dev
   ```

4. **Frontend** will use `http://localhost:5000/api` by default

---

## Next Steps

- [ ] Generate a strong `JWT_SECRET`
- [ ] Update `MONGODB_URI` in Render with your actual credentials
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Update backend `CLIENT_URL` with Vercel URL
- [ ] Test the full flow (login, create lead, etc.)

