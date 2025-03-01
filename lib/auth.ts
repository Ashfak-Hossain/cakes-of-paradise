import { auth } from '@/auth';

export const CurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const CurrentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};

export const accessToken = async () => {
  const session = await auth();
  return session?.access_token;
};
