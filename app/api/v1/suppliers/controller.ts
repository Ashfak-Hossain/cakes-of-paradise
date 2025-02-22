import { ServerError } from '@/app/api/v1/error/errorHandler';
import { getSuppliers } from '@/app/api/v1/suppliers/service';

class SupplierController {
  /**
   ** Get all suppliers from the database
   * @returns List of suppliers
   */
  static async getSuppliers() {
    try {
      const suppliers = await getSuppliers();
      return suppliers;
    } catch {
      throw new ServerError('Error fetching suppliers');
    }
  }
}

export default SupplierController;
