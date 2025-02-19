import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { ingredientPurchaseSchema } from '@/schemas/ingredient';
import { purchaseIngredient } from '@/app/api/v1/purchases/service';

class PurchaseController {
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
