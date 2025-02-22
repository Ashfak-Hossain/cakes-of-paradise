import { Ingredient } from '@prisma/client';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';

export const getIngredient = async (slug: string): Promise<Ingredient> => {
  try {
    const ingredient = await db.ingredient.findUnique({
      where: { ingredient_id: Number(slug) },
      include: { purchases: true },
    });

    if (!ingredient) {
      throw new DatabaseError('Ingredient not found');
    }

    return ingredient;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error fetching ingredient', error);
  }
};

export const updateIngredient = async (
  slug: string,
  data: { ingredient_name: string; reorder_level: number }
): Promise<Ingredient> => {
  try {
    const ingredient = await db.ingredient.update({
      where: { ingredient_id: Number(slug) },
      data,
    });

    return ingredient;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error updating ingredient', error);
  }
};
