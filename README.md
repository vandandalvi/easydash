# Smart Leads Dashboard

Full-stack MERN app:
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Express + TypeScript + MongoDB + Mongoose + JWT

## Documentation
- API docs: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Local Setup

### 1. Frontend
```bash
npm install
cp .env.example .env
npm run dev
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

## Docker Setup

Run full stack with Docker:
```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

## MongoDB Setup (Atlas)

1. Create a cluster in MongoDB Atlas.
2. Create a database user.
3. Add your IP (or `0.0.0.0/0` for quick testing).
4. Copy the connection string and set `MONGODB_URI` in `backend/.env`.

Example:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxxx.mongodb.net/smart-leads?retryWrites=true&w=majority
JWT_SECRET=your-very-strong-secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

## Deploy

### Frontend on Vercel
1. Import this repo in Vercel.
2. Framework preset: `Vite`.
3. Set env var:
   - `VITE_API_BASE_URL=https://<your-render-backend>.onrender.com/api`
4. Deploy.

`vercel.json` includes SPA rewrite support.

### Backend on Render
1. Create a new Web Service from the same repo.
2. Set `Root Directory` to `backend`.
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add env vars:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL=https://<your-vercel-domain>`
   - `PORT=10000` (or leave Render default)
6. Deploy.

You can also use `render.yaml` as blueprint.
