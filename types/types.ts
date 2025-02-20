import { AddIngredient } from '@/schemas/ingredient';
import { Purchase } from '@/schemas/purchase';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type AddIngredientReturn = {
  newIngredient: Partial<AddIngredient>;
  newPurchase: Purchase;
};
