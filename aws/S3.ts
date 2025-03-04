import { DeleteObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { s3Client } from '@/aws/Client';

interface S3File {
  file: File;
  key?: string;
  contentType?: string;
  metadata?: Record<string, string>;
}

export const putObjectToS3 = async ({ file, key, contentType, metadata }: S3File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key || file.name,
      Body: uint8Array,
      ContentType: contentType || file.type,
      Metadata: metadata,
    };

    const uploadResult = await new Upload({
      client: s3Client,
      params: uploadParams,
    }).done();

    if (uploadResult && uploadResult.Location) {
      const url = new URL(uploadResult.Location as string);
      return url.pathname.slice(1);
    }
  } catch (error) {
    console.error('Error uploading file: ', error);
    throw error;
  }
};

export const deleteObjectFromS3 = async (key: string) => {
  try {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    const command = new DeleteObjectCommand(deleteParams);

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting object from S3: ', error);
    throw error;
  }
};
