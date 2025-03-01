import bcrypt from 'bcryptjs';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { SignUp } from '@/schemas/auth';

export const createUser = async (user: SignUp) => {
  try {
    const { name, email, password } = user;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('User with this email already exists', 400);

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: { connect: { name: 'Customer' } },
      },
    });

    return newUser;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred: ', error);
  }
};
