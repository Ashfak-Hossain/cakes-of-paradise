import { NextResponse } from 'next/server';

import purchaseController from '@/app/api/v1/purchases/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export async function GET() {
  return NextResponse.json({ message: 'GET /api/v1/purchase' }, { status: 200 });
}

export const POST = apiHandler(purchaseController.createPurchase, 201);
