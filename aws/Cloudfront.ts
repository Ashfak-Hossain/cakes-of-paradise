import { CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

import { cloudfront } from '@/aws/Client';

/**
 * Generates a signed CloudFront URL for a given S3 object key.
 *
 * @param {string} s3ObjectKey - The key of the object in the S3 bucket.
 * @example
 * ```ts
 * const url = await getSignedCloudfrontUrl('xyz/aHTnC-Qx66HHPPdL_3Y-pain.jpg');
 * ```
 * @returns {Promise<string>} A promise that resolves to a signed CloudFront URL.
 * @example
 * ```json
 * https://d12wky652yl4t2.cloudfront.net/xyz/aHTnC-Qx66HHdL_3Y9Y-pain.jpg?Expires=1741197350&Key-Pair-Id=KQKYMIBR&Signature=LR71dBBDoga3LkdRGE3dQ2RB4WtaOpaXfUGUygA__
 * ```
 * @throws {Error} If an error occurs during URL signing.
 */
export const getSignedCloudfrontUrl = async (s3ObjectKey: string): Promise<string> => {
  try {
    const url = getSignedUrl({
      url: `https://${process.env.AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN}/${s3ObjectKey}`,
      dateLessThan: new Date(Date.now() + 24 * 60 * 60 * 1000).toString(), // 24 hours
      privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY as string,
      keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID as string,
    });

    return url;
  } catch (error) {
    console.error('Error generating signed CloudFront URL:', error);
    throw error;
  }
};

export const invalidateCloudfront = async (s3ObjectKey: string) => {
  const invalidationParams = {
    DistributionId: process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: s3ObjectKey,
      Paths: {
        Quantity: 1,
        Items: [`/${s3ObjectKey}`],
      },
    },
  };
  const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
  await cloudfront.send(invalidationCommand);
};
