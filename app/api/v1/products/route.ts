import ProductController from '@/app/api/v1/products/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(ProductController.getAllProducts, 200);
