import { signOutUser } from '@/app/api/v1/auth/signout/service';
import { AppError, ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';

class SignOutController {
  /**
   * * Sign in a user
   */
  static async signOut() {
    try {
      const data = await signOutUser();
      return data;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else if (error instanceof AppError) throw error;
      else throw new ServerError();
    }
  }
}
export default SignOutController;
