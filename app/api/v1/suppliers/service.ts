import { Supplier } from '@prisma/client';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';

export const getSuppliers = async (): Promise<Supplier[]> => {
  try {
    const suppliers = await db.supplier.findMany();

    return suppliers;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching suppliers', error);
  }
};
