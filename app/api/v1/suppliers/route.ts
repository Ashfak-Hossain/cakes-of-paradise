import SupplierController from '@/app/api/v1/suppliers/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const GET = apiHandler(SupplierController.getSuppliers, 200);
