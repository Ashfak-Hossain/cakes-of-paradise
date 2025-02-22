import { NextResponse } from 'next/server';

import { handleError } from '@/app/api/v1/error/errorHandler';
import { ApiResponse } from '@/app/api/v1/types/types';

export function apiHandler<T, P = any>(
  handler: (req: Request, params: P) => Promise<T>,
  successStatusCode: number = 200
) {
  return async function (req: Request, params: P) {
    try {
      const result = await handler(req, params);
      const apiResponse: ApiResponse<T> = { success: true, data: result };
      return NextResponse.json(apiResponse, { status: successStatusCode });
    } catch (error: any) {
      const errorResponse = handleError(error);
      return NextResponse.json(errorResponse, { status: error.statusCode || 500 });
    }
  };
}
