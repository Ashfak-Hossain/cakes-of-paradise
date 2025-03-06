import CategoriesController from '@/app/api/v1/categories/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

//* Get all categories
export const GET = apiHandler(CategoriesController.getAllCategories, 200);

//* Create a new category
export const POST = apiHandler(CategoriesController.createCategory, 201);
