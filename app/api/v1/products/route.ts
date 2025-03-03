import ProductController from '@/app/api/v1/products/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

//* Get all products
export const GET = apiHandler(ProductController.getAllProducts, 200);

//* Create a new product
export const POST = apiHandler(ProductController.createProduct, 201);
