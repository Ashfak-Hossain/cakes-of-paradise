import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { Ingredient } from '@/schemas/ingredient';
import { AddIngredientReturn, GetIngredientsReturn } from '@/types/types';

export const getIngredients = async (): Promise<GetIngredientsReturn[]> => {
  try {
    const ingredients = await db.ingredient.findMany({
      include: {
        purchases: true,
        supplier: {
          select: { supplier_id: true, supplier_name: true },
        },
      },
    });

    return ingredients;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching ingredients', error);
  }
};

export const addIngredient = async (validatedData: Ingredient): Promise<AddIngredientReturn> => {
  try {
    const {
      ingredient_name,
      unit_of_measure,
      stock: current_stock,
      cost,
      reorder_level,
      supplier_id,
    } = validatedData;

    if (current_stock <= 0) {
      throw new DatabaseError('Current stock must be greater than zero');
    }

    if (cost <= 0) {
      throw new DatabaseError('Cost must be greater than zero');
    }

    const result = await db.$transaction(async (tx) => {
      // Create the new ingredient
      const newIngredient = await tx.ingredient.create({
        data: {
          ingredient_name: ingredient_name,
          unit_of_measure: unit_of_measure,
          current_stock: current_stock,
          reorder_level: reorder_level,
          supplier: supplier_id ? { connect: { supplier_id: supplier_id } } : undefined,
        },
      });

      //! Feat (future): Implement connectOrCreate for supplier
      //  supplier: data.supplier_id ? { connect: { supplier_id: data.supplier_id } } : undefined,
      //    becomes:
      //  supplier: data.supplier_id ? {
      //     connectOrCreate: {
      //       where: { supplier_id: data.supplier_id },
      //       create: { /* supplier creation data */ }, // Data for creating a supplier if it doesn't exist
      //     },
      //   } : undefined,

      const newPurchase = await tx.purchase.create({
        data: {
          ingredient: {
            connect: { ingredient_id: newIngredient.ingredient_id },
          },
          quantity: current_stock,
          unit_cost: cost / current_stock,
          total_cost: cost,
          purchase_date: new Date(),
          supplier: supplier_id ? { connect: { supplier_id } } : undefined, // Connect supplier if available.
        },
      });

      // Log the inventory change
      await tx.inventoryLog.create({
        data: {
          ingredient: {
            connect: { ingredient_id: newIngredient.ingredient_id },
          },
          change_amount: current_stock,
          reference_type: 'purchase',
          reference_id: newPurchase.purchase_id,
        },
      });

      return { newIngredient, newPurchase };
    });

    return result;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while creating ingredient Purchase', error);
  }
};
