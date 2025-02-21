import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ingredientUpdateSchema } from '@/schemas/ingredient';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const ingredient = await db.ingredient.findUnique({
      where: { ingredient_id: Number(slug) },
      include: { purchases: true },
    });

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ingredient', message: error },
      { status: 500 }
    );
  }
}

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
