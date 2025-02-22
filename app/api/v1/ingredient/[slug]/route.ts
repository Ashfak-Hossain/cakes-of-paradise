import SingleIngredientController from '@/app/api/v1/ingredient/[slug]/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(SingleIngredientController.getIngredient, 200);

export const PATCH = apiHandler(SingleIngredientController.updateIngredient, 200);
