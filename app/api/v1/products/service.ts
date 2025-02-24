import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { getProductsReturn } from '@/types/types';

export const getProducts = async (limit: number, page: number): Promise<getProductsReturn> => {
  try {
    const offset = (page - 1) * limit;

    const products = await db.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { product_id: 'asc' },
      include: { Picture: true },
    });

    const totalCount = await db.product.count();

    return { products, totalCount };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching products', error);
  }
};
