import { Product } from '@prisma/client';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await db.product.findMany();

    return products;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching products', error);
  }
};
