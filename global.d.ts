declare namespace NodeJS {
  export interface ProcessEnv {
    //* Database
    DATABASE_URL: string;

    //* Next
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_API_URL: string;

    //* Auth
    AUTH_SECRET: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    //* Amazon Web Services (AWS)
    AWS_S3_IAM_USER_ACCESS_KEY_ID: string;
    AWS_S3_IAM_USER_SECRET_KEY: string;

    AWS_S3_BUCKET: string;
    AWS_S3_REGION: string;

    AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN: string;
    AWS_CLOUDFRONT_DISTRIBUTION_ID: string;
    AWS_CLOUDFRONT_KEY_PAIR_ID: string;
    AWS_CLOUDFRONT_PRIVATE_KEY: string;
  }
}
