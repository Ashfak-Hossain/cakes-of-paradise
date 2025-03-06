import { NextRequest } from 'next/server';

import { addCategory, getCategories } from '@/app/api/v1/categories/service';
import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { categorySchema } from '@/schemas/category';

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

  /**
   * * Create a new category
   * @param req - The Next.js request object.
   * @returns
   */
  static async createCategory(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = categorySchema.parse(body);

      const category = await addCategory(validatedData);
      return category;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      throw error;
    }
  }
}

export default CategoriesController;
