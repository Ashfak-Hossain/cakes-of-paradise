import { ServerError } from '@/app/api/v1/error/errorHandler';
import { getProducts } from '@/app/api/v1/products/service';

class ProductController {
  /**
   ** Get all products from the database
   * @returns List of products
   */
  static async getAllProducts() {
    try {
      const products = await getProducts();
      return products;
    } catch {
      throw new ServerError();
    }
  }
}

export default ProductController;
