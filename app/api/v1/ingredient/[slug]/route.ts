import { NextResponse } from 'next/server';

import SingleIngredientController from '@/app/api/v1/ingredient/[slug]/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';
import { db } from '@/lib/db';
import { ingredientUpdateSchema } from '@/schemas/ingredient';

export const GET = apiHandler(SingleIngredientController.getIngredient, 200);

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const updateData = ingredientUpdateSchema.parse(body);

    const { ingredient_name, reorder_level } = updateData;

    const ingredient = await db.ingredient.update({
      where: { ingredient_id: Number(slug) },
      data: {
        ingredient_name,
        reorder_level,
      },
    });

    return NextResponse.json({ success: true, data: ingredient }, { status: 200 });
  } catch (error) {
    console.error('Error updating ingredient:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to update ingredient' },
      { status: 500 }
    );
  }
}
