import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

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
