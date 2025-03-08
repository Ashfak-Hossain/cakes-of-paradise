import { Product } from '@prisma/client';

import { DatabaseError, NotFoundError } from '@/app/api/v1/error/errorHandler';
import { db } from '@/lib/db';

/**
 * Retrieves a product by its ID from the database.
 *
 * @async
 * @function getProductById
 * @param {string} productId - The ID (slug) of the product to retrieve.
 * @returns {Promise<Product>} - A promise that resolves to the product object.
 * @throws {NotFoundError} - If the product with the given ID is not found.
 * @throws {DatabaseError} - If an error occurs during the database operation.
 *
 * @example
 * ```ts
 * const product = await getProductById("123");
 * ```
 */
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const product = await db.product.findUnique({
      where: { product_id: Number(productId) },
      include: {
        // Picture: true,
        orderDetails: {
          //! later on, we can add all customer details here, like name, email, etc.
          //! for now, we are only interested in the quantity, unit_price, and total_price
          select: {
            quantity: true,
            unit_price: true,
            total_price: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found.`);
    }

    return product;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError(`Error retrieving product with ID ${productId}.`);
  }
};
