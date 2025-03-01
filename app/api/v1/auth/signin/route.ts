import SignInController from '@/app/api/v1/auth/signin/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const POST = apiHandler(SignInController.signIn, 200);
