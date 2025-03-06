import { Category } from '@prisma/client';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { CategorySchemaType } from '@/schemas/category';

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

/**
 *
 * @param validatedData - The validated data from the request body
 * @returns The newly created category object
 * @throws {DatabaseError} - If an error occurs while creating the category
 * @throws {DatabaseError} - If the category already exists
 * @throws {AppError} - If an error occurs while creating the category
 */
export const addCategory = async (validatedData: CategorySchemaType): Promise<Category> => {
  try {
    const { category_name, description } = validatedData;

    const category = await db.category.findUnique({ where: { category_name } });

    if (category) {
      throw new DatabaseError('Category already exists');
    }

    const newCategory = await db.category.create({
      data: { category_name, description },
    });

    return newCategory;
  } catch (error: any) {
    console.log(error);
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while creating category', error);
  }
};

//! when delete category, check if there are products in that category and if there are, throw an error
//! when updating category, check if there are products in that category and if there are, throw an error
