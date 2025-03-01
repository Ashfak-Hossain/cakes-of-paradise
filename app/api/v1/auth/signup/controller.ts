import { NextRequest } from 'next/server';

import { createUser } from '@/app/api/v1/auth/signup/service';
import { ServerError, ValidationError } from '@/app/api/v1/error/errorHandler';
import { SignUpSchema } from '@/schemas/auth';

class SignUpController {
  /**
   ** Create a new user account with the provided details
   * @returns Created user
   */
  static async createUser(req: NextRequest) {
    try {
      const body = await req.json();
      const validatedUser = SignUpSchema.parse(body);

      const user = await createUser(validatedUser);
      return user;
    } catch (error: any) {
      console.log(error);
      if (error.name === 'ZodError') throw new ValidationError(error.errors);
      else if (error.name === 'AppError') throw error;
      else throw new ServerError();
    }
  }
}

export default SignUpController;
