import { ServerError } from '@/app/api/v1/error/errorHandler';
import { getIngredient } from '@/app/api/v1/ingredient/[slug]/service';

class SingleIngredientController {
  /**
   * * Get a single ingredient from the database
   * @param req Request object
   * @param param1 Object containing the slug of the ingredient
   * @returns A single ingredient
   */
  static async getIngredient(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
      const { slug } = await params;
      const ingredient = await getIngredient(slug);
      return ingredient;
    } catch {
      throw new ServerError();
    }
  }
}

export default SingleIngredientController;
