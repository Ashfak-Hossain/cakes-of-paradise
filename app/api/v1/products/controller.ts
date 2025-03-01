import { NextRequest } from 'next/server';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/app/(Dashboard)/products/page';
import { ServerError } from '@/app/api/v1/error/errorHandler';
import { getProducts } from '@/app/api/v1/products/service';

class ProductController {
  /**
   ** Get all products from the database
   * @returns List of products
   */
  static async getAllProducts(req: NextRequest) {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || DEFAULT_LIMIT);
    const page = parseInt(req.nextUrl.searchParams.get('page') || DEFAULT_PAGE);

    try {
      const { products, totalCount } = await getProducts(limit, page);
      return { products, totalCount };
    } catch {
      throw new ServerError();
    }
  }
}

export default ProductController;
