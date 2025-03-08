import { DatabaseError, NotFoundError, ServerError } from '@/app/api/v1/error/errorHandler';
import { getProductById } from '@/app/api/v1/products/[slug]/service';

/**
 * Controller class for handling requests to a single product.
 *
 * @class SingleProductController
 */
class SingleProductController {
  /**
   * Controller function to get a product by its slug (product ID).
   *
   * @static
   * @async
   * @function getProductById
   * @param {Request} _req - The Next.js request object (unused).
   * @param {object} params - The route parameters.
   * @param {Promise<{ slug: string }>} params.params - A promise that resolves to the route parameters object.
   * @param {string} params.params.slug - The slug (product ID) of the product to retrieve.
   * @throws {NotFoundError} - If the product with the given slug is not found.
   * @throws {DatabaseError} - If an error occurs during the database operation.
   * @throws {ServerError} - If an unexpected error occurs during the process.
   *
   * @example
   * ```ts
   * const product = await SingleProductController.getProductById(req, { params: Promise.resolve({ slug: "123" }) });
   * ```
   */
  static getProductById = async (
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) => {
    try {
      const { slug } = await params;
      const product = await getProductById(slug);

      const productWithSignedUrls = {
        ...product,
      };

      return productWithSignedUrls;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else if (error instanceof DatabaseError) {
        throw error;
      }
      throw new ServerError('Error fetching product');
    }
  };
}

export default SingleProductController;
