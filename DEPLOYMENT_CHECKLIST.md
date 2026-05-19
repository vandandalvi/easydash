# Deployment Checklist: Quick Start

## ✅ Backend (Render)

- [ ] **GitHub**: Push code to GitHub
- [ ] **Render Account**: Create at https://render.com
- [ ] **Connect Repo**: Link your GitHub repo to Render
- [ ] **Create Web Service**:
  - Name: `smart-leads-backend`
  - Root: `backend`
  - Build: `npm install && npm run build`
  - Start: `npm run start`
- [ ] **Set Environment Variables**:
  ```
  MONGODB_URI = mongodb+srv://vandandalvi_db_user:6rDsNWwEQ9LzMmME@cluster0.fyvwrq7.mongodb.net/?appName=Cluster0
  JWT_SECRET = (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  CLIENT_URL = https://your-frontend-url.vercel.app (set after Vercel deploy)
  ```
- [ ] **Deploy**: Render auto-deploys on push to main
- [ ] **Copy Backend URL**: Will be like `https://smart-leads-backend.render.com`

---

## ✅ Frontend (Vercel)

- [ ] **Vercel Account**: Create at https://vercel.com
- [ ] **Import Project**: Select GitHub repo `internsh`
- [ ] **Framework**: Vite (should auto-detect)
- [ ] **Build Settings**:
  - Build: `npm run build`
  - Output: `dist`
- [ ] **Environment Variables**:
  ```
  VITE_API_BASE_URL = https://smart-leads-backend.render.com/api
  ```
  (Replace with actual Render URL)
- [ ] **Deploy**: Click Deploy, wait for completion
- [ ] **Copy Frontend URL**: Will be like `https://internsh.vercel.app`

---

## ✅ Final Steps

- [ ] Update Render backend `CLIENT_URL` to Vercel frontend URL
- [ ] Test: Visit frontend, login, create a lead
- [ ] Check browser console for API errors
- [ ] Check Render logs if backend issues occur

---

## Generated JWT Secret Example
```bash
# Run this locally to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output (example): abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
# Use this value for MONGODB_URI in Render dashboard
```

---

## Useful Links

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Your Deployment Guide**: See `DEPLOYMENT.md` for detailed steps

