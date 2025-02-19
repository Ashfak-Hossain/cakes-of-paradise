import { NextResponse } from 'next/server';
import purchaseController from './controller';
import { apiHandler } from '../utils/apiHandler';

export async function GET() {
  return NextResponse.json({ message: 'GET /api/v1/purchase' }, { status: 200 });
}

export const POST = apiHandler(purchaseController.createPurchase, 201);
