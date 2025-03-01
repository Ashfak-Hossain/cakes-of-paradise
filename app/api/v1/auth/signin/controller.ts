import { NextRequest } from 'next/server';

import { authenticateUser } from '@/app/api/v1/auth/signin/service';
import { AppError, ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { SignInSchema } from '@/schemas/auth';

class SignInController {
  /**
   * * Sign in a user
   */
  static async signIn(req: NextRequest) {
    try {
      const body = await req.json();
      const validatedData = SignInSchema.parse(body);

      const user = await authenticateUser(validatedData);
      return user;
    } catch (error: any) {
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else if (error instanceof AppError) throw error;
      else throw new ServerError();
    }
  }
}
export default SignInController;
