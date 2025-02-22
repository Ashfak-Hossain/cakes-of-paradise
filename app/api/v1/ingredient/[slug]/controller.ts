import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { getIngredient, updateIngredient } from '@/app/api/v1/ingredient/[slug]/service';
import { ingredientUpdateSchema } from '@/schemas/ingredient';

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

  /**
   * * Update a single ingredient in the database
   * @param req Request object
   * @param param1 Object containing the slug of the ingredient
   * @returns Updated ingredient
   */
  static async updateIngredient(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
      const { slug } = await params;
      const body = await req.json();

      const updateData = ingredientUpdateSchema.parse(body);
      const { ingredient_name, reorder_level } = updateData;

      const ingredient = await updateIngredient(slug, { ingredient_name, reorder_level });
      return ingredient;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else throw new ServerError();
    }
  }
}

export default SingleIngredientController;
