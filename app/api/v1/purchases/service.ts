import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';
import { IngredientPurchase } from '@/schemas/ingredient';
import { Purchase } from '@/schemas/purchase';

export const purchaseIngredient = async (validatedData: IngredientPurchase): Promise<Purchase> => {
  try {
    const { supplier_id, ingredient_id, stock, cost, purchase_date } = validatedData;

    // Check if ingredient exists
    const ingredientExists = await db.ingredient.findUnique({ where: { ingredient_id } });
    if (!ingredientExists) {
      throw new DatabaseError('Ingredient not found');
    }

    // Check if supplier exists if supplier_id is provided
    if (supplier_id) {
      const supplierExists = await db.supplier.findUnique({ where: { supplier_id } });
      if (!supplierExists) {
        throw new DatabaseError('Supplier not found');
      }
    }

    const purchase = await db.$transaction(async (tx) => {
      const purchaseData = {
        ingredient: { connect: { ingredient_id } },
        ...(supplier_id && { supplier: { connect: { supplier_id } } }),
        quantity: stock,
        unit_cost: stock !== 0 ? cost / stock : 0,
        total_cost: cost,
        purchase_date: purchase_date,
      };

      const newPurchase = await tx.purchase.create({ data: purchaseData });

      await tx.ingredient.update({
        where: { ingredient_id },
        data: {
          current_stock: { increment: stock },
          ...(supplier_id && { supplier: { connect: { supplier_id } } }),
        },
      });

      await tx.inventoryLog.create({
        data: {
          ingredient: {
            connect: { ingredient_id },
          },
          change_amount: stock,
          reference_type: 'purchase',
          reference_id: newPurchase.purchase_id,
        },
      });

      return newPurchase;
    });

    return purchase;
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError('An error occurred while creating purchase', error);
  }
};
