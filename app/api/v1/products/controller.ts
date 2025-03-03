import { NextRequest } from 'next/server';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/app/(Dashboard)/products/page';
import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { createProduct, getProducts } from '@/app/api/v1/products/service';
import { productSchema } from '@/schemas/product';

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

  /**
   * * Create a new product
   * @param req
   * @returns
   */
  static async createProduct(request: NextRequest) {
    try {
      const formData = await request.formData();

      const body: any = {};
      const photos: File[] = [];

      for (const entry of formData.entries()) {
        const [key, value] = entry;
        if (key === 'photos') {
          if (value instanceof File) {
            photos.push(value);
          }
        } else {
          body[key] = value;
        }
      }

      const validatedData = productSchema.parse(body);

      const product = await createProduct({ productData: validatedData, photos });
      return product;
    } catch (error: any) {
      console.log(error);
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else throw new ServerError();
    }
  }
}

export default ProductController;
