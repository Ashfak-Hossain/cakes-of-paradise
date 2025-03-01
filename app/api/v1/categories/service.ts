import { Category } from '@prisma/client';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await db.category.findMany({
      include: {
        products: true,
      },
    });

    return categories;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching categories', error);
  }
};

//! when delete category, check if there are products in that category and if there are, throw an error
//! when updating category, check if there are products in that category and if there are, throw an error
