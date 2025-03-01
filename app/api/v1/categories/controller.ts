import { getCategories } from '@/app/api/v1/categories/service';
import { ServerError } from '@/app/api/v1/error/errorHandler';

class CategoriesController {
  /**
   * * Get all categories from the database
   * @returns
   */
  static async getAllCategories() {
    try {
      const categories = await getCategories();
      return categories;
    } catch (_error: any) {
      throw new ServerError();
    }
  }
}

export default CategoriesController;
