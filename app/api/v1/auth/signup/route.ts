import SignUpController from '@/app/api/v1/auth/signup/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const POST = apiHandler(SignUpController.createUser, 201);
