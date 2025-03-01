import SignOutController from '@/app/api/v1/auth/signout/controller';
import { apiHandler } from '@/app/api/v1/utils/apiHandler';

export const DELETE = apiHandler(SignOutController.signOut, 200);
