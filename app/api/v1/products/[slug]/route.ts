import SingleProductController from '@/app/api/v1/products/[slug]/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(SingleProductController.getProductById, 200);
