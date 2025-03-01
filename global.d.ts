declare namespace NodeJS {
  export interface ProcessEnv {
    //* Database *//
    DATABASE_URL: string;

    //* App *//
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;

    //* Auth *//
    AUTH_SECRET: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }
}
