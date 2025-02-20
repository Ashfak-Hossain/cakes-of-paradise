import { NextResponse } from 'next/server';

import IngredientController from '@/app/api/v1/ingredient/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';
import { db } from '@/lib/db';
import { ApiError } from '@/lib/fetcher';

export async function GET() {
  try {
    const ingredients = await db.ingredient.findMany({
      include: {
        purchases: true,
        supplier: {
          select: { supplier_id: true, supplier_name: true },
        },
      },
    });

    return NextResponse.json(ingredients, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching ingredients:', error);

    const errorResponse: ApiError = {
      error: 'DATABASE_ERROR',
      code: 'INGREDIENT_FETCH_FAILED',
      details: process.env.NODE_ENV === 'production' ? undefined : error.message,
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }
}

export const POST = apiHandler(IngredientController.create, 201);
