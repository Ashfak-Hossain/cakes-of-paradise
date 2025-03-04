import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_USER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_IAM_USER_SECRET_KEY,
  },
});

export const cloudfront = new CloudFrontClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_USER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_IAM_USER_SECRET_KEY,
  },
});
