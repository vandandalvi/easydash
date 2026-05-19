import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from './env.js';
import { UserModel } from '../models/User.js';

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  await seedDefaultAdmin();
}

async function seedDefaultAdmin(): Promise<void> {
  try {
    const adminExists = await UserModel.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await UserModel.create({
        name: 'Admin User',
        email: 'admin@smartleads.com',
        password: hashedPassword,
        role: 'admin',
      });
      // eslint-disable-next-line no-console
      console.log('✓ Default admin account created: admin@smartleads.com / admin123');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Seed error:', error);
  }
}
