import IngredientController from '@/app/api/v1/ingredient/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(IngredientController.getAll, 200);

export const POST = apiHandler(IngredientController.create, 201);
