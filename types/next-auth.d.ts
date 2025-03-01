export type ExtendedUser = DefaultSession['user'] & {
  role?: string;
  accessToken?: string;
};

export declare module 'next-auth' {
  interface User {
    role?: string;
    accessToken?: string;
  }

  interface Session {
    user: ExtendedUser;
    error: string;
    access_token: string;
  }

  interface JWT {
    user: ExtendedUser;
    access_token: string;
  }
}
