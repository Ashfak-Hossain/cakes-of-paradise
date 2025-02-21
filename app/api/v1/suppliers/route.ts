import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ApiError } from '@/lib/fetcher';

export async function GET() {
  try {
    const suppliers = await db.supplier.findMany();

    return NextResponse.json({ success: true, data: suppliers }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching suppliers:', error);

    const errorResponse: ApiError = {
      error: 'DATABASE_ERROR',
      code: 'SUPPLIER_FETCH_FAILED',
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
