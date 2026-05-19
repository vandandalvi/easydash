import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { UserModel } from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'sales']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(req: Request, res: Response): Promise<void> {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const exists = await UserModel.findOne({ email: parsed.data.email.toLowerCase() });
  if (exists) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  const user = await UserModel.create({ 
    ...parsed.data, 
    email: parsed.data.email.toLowerCase(), 
    password: hashedPassword,
    role: 'sales',
  });
  const token = signToken({ userId: user._id.toString(), role: user.role });
  res.status(201).json({ token, user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role } });
}

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const user = await UserModel.findOne({ email: parsed.data.email.toLowerCase() });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(parsed.data.password, user.password);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = signToken({ userId: user._id.toString(), role: user.role });
  res.json({ token, user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role } });
}
