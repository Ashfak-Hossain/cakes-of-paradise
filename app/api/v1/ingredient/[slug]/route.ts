import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ingredient = await db.ingredient.findUnique({
      where: {
        ingredient_id: Number(slug),
      },
      include: {
        purchases: true,
      },
    });

    if (!ingredient) {
      return NextResponse.json(
        { error: 'Ingredient not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch ingredient', message: error },
      { status: 500 }
    );
  }
}
