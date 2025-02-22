declare namespace NodeJS {
  export interface ProcessEnv {
    //* Database *//
    DATABASE_URL: string;

    //* App *//
    NEXT_PUBLIC_API_BASE_URL: string;
  }
}
