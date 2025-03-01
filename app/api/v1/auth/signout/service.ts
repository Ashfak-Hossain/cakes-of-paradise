import { cookies } from 'next/headers';

import { AppError } from '@/app/api/v1/error/errorHandler';

export const signOutUser = async () => {
  try {
    const cookieStore = await cookies();

    const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';
    cookieStore.getAll().map((cookie) => {
      if (cookie.name.startsWith(`${prefix}xxx.`)) {
        cookieStore.delete(cookie.name as any);
      }
    });
    return true;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
  }
};
