import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { leadRouter } from './routes/lead.routes.js';

export const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? [env.CLIENT_URL] : true,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/leads', leadRouter);
