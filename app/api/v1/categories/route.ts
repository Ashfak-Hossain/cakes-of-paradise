import CategoriesController from '@/app/api/v1/categories/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(CategoriesController.getAllCategories, 200);
