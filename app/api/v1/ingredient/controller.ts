import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { addIngredient, getIngredients } from '@/app/api/v1/ingredient/service';
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
      console.log(error);
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else throw new ServerError();
    }
  }

  /**
   ** Get all ingredients from the database
   * @returns List of ingredients
   */
  static async getAll() {
    try {
      const ingredients = await getIngredients();
      return ingredients;
    } catch {
      throw new ServerError();
    }
  }
}

export default IngredientController;
