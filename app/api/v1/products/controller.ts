import { NextRequest } from 'next/server';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/app/(Dashboard)/products/page';
import {
  AppError,
  DatabaseError,
  ServerError,
  ValidationError,
} from '@/app/api/v1/error/errorHandler';
import { createProduct, getProducts } from '@/app/api/v1/products/service';
import { productSchema } from '@/schemas/product';
import { getProductsReturn } from '@/types/types';

class ProductController {
  /**
   * Controller function to get all products.
   *
   * @param {NextRequest} req - The Next.js request object.
   * @returns {Promise<getProductsReturn>} - A promise that resolves to an object containing the list of products and the total count.
   * @example
   * ```ts
   * const { products, totalCount } = await ProductController.getAllProducts(req);
   * ```
   * @throws {ServerError} If an error occurs during the process.
   *
   */
  static getAllProducts = async (req: NextRequest): Promise<getProductsReturn> => {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || DEFAULT_LIMIT);
    const page = parseInt(req.nextUrl.searchParams.get('page') || DEFAULT_PAGE);

    try {
      const { products, totalCount } = await getProducts(limit, page);

      return { products, totalCount };
    } catch (error: any) {
      if (error instanceof AppError) {
        console.error('AppError:', error);
        throw error;
      } else if (error instanceof DatabaseError) {
        console.error('DatabaseError:', error);
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new ServerError();
      }
    }
  };

  /**
   * * Create a new product
   * @param req
   * @returns
   */
  static createProduct = async (request: NextRequest) => {
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
  };
}

export default ProductController;
