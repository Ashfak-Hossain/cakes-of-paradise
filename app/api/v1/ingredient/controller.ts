import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { addIngredient } from '@/app/api/v1/ingredient/service';
import { ingredientSchema } from '@/schemas/ingredient';

class IngredientController {
  /**
   ** Add a new ingredient to the database
   * @param req Request object
   * @returns Created ingredient
   */
  static async create(req: Request) {
    try {
      const body = await req.json();
      const validatedData = ingredientSchema.parse(body);

      const ingredient = await addIngredient(validatedData);
      return ingredient;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else throw new ServerError();
    }
  }
}

export default IngredientController;
