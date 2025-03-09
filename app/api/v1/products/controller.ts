import { NextRequest } from 'next/server';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/app/(Dashboard)/dashboard/products/page';
import {
  AppError,
  DatabaseError,
  ServerError,
  ValidationError,
} from '@/app/api/v1/error/errorHandler';
import { createProduct, getProducts } from '@/app/api/v1/products/service';
import { productSchema } from '@/schemas/product';
import { getProductsReturn } from '@/types/types';

/**
 * ProductController class for handling product-related API requests.
 */
class ProductController {
  /**
   * Controller function to get all products.
   *
   * @static
   * @async
   * @function getAllProducts
   * @param {NextRequest} req - The Next.js request object.
   * @returns {Promise<getProductsReturn>} - A promise that resolves to an object containing the list of products and the total count.
   * @throws {ServerError} - If an error occurs during the process.
   *
   * @example
   * ```ts
   * const { products, totalCount } = await ProductController.getAllProducts(req);
   * ```
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
   * Controller function to create a new product.
   *
   * @static
   * @async
   * @function createProduct
   * @param {NextRequest} request - The Next.js request object containing form data.
   * @returns {Promise<any>} - A promise that resolves to the created product object.
   * @throws {ValidationError} - If the request body fails validation against the product schema.
   * @throws {ServerError} - If an error occurs during the process.
   *
   * @example
   * ```ts
   * const product = await ProductController.createProduct(request);
   * ```
   */
  static createProduct = async (request: NextRequest): Promise<any> => {
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
