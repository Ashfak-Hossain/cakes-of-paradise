import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { purchaseIngredient } from '@/app/api/v1/purchases/service';
import { ingredientPurchaseSchema } from '@/schemas/ingredient';

class PurchaseController {
  /**
   ** Purchase an ingredient
   * @param req Request object
   * @returns Created purchase
   */
  static async createPurchase(req: Request) {
    try {
      const body = await req.json();
      const validatedData = ingredientPurchaseSchema.parse(body);

      const purchase = await purchaseIngredient(validatedData);
      return purchase;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else throw new ServerError(error);
    }
  }
}

export default PurchaseController;
