import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

import {
  AppError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
} from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { SignIn } from '@/schemas/auth';

export const authenticateUser = async (credentials: SignIn) => {
  try {
    const { email, password } = credentials;

    const user = await db.user.findUnique({
      where: { email },
      include: { role: { select: { name: true } } },
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password || '');
    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new DatabaseError('JWT secrets are not configured.');
    }

    const secretAccess = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
    const accessToken = await new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secretAccess);

    const secretRefresh = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);
    const refreshToken = await new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secretRefresh);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred: ', error);
  }
};
