import { CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_USER_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_IAM_USER_SECRET_KEY as string,
  },
});

export const cloudfront = new CloudFrontClient({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_IAM_USER_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_IAM_USER_SECRET_KEY as string,
  },
});
