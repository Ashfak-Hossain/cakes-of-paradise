import { db } from '@/lib/db';
import { ingredientSchema } from '@/schemas/ingredient';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    const ingredients = await db.ingredient.findMany({
      include: {
        supplier: true,
      },
    });

    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ingredients', message: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = ingredientSchema.parse(body);

    // Prepare data for ingredient creation
    const data = {
      ingredient_name: validatedData.ingredient_name,
      unit_of_measure: validatedData.unit_of_measure,
      current_stock: validatedData.stock,
      cost: validatedData.cost,
      reorder_level: validatedData.reorder_level,
      supplier_id: validatedData.supplier_id || null,
    };

    const result = await db.$transaction(async (tx) => {
      //Create the new ingredient
      const newIngredient = await tx.ingredient.create({
        data: {
          ingredient_name: data.ingredient_name,
          unit_of_measure: data.unit_of_measure,
          current_stock: data.current_stock,
          reorder_level: data.reorder_level,
          supplier: data.supplier_id
            ? { connect: { supplier_id: data.supplier_id } }
            : undefined,
        },
      });

      const newPurchase = await tx.purchase.create({
        data: {
          ingredient: {
            connect: { ingredient_id: newIngredient.ingredient_id },
          },
          quantity: data.current_stock,
          unit_cost: data.cost / data.current_stock,
          total_cost: data.cost,
          purchase_date: new Date(),
          supplier: data.supplier_id
            ? { connect: { supplier_id: data.supplier_id } }
            : undefined, // Connect supplier if available.
        },
      });

      // Log the inventory change
      await tx.inventoryLog.create({
        data: {
          ingredient: {
            connect: { ingredient_id: newIngredient.ingredient_id },
          },
          change_amount: data.current_stock,
          reference_type: 'purchase',
          reference_id: newPurchase.purchase_id,
        },
      });

      return { newIngredient, newPurchase };
    });
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error adding ingredient:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to add ingredient' },
      { status: 500 }
    );
  }
}
