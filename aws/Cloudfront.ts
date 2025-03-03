// 'use server';

// import { CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

// // import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
// import { cloudfront } from '@/aws/Client';

// export const getSignedCloudfrontUrl = async (imageName: string, path?: string) => {
//   const url = getSignedUrl({
//     url: path
//       ? `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${path}/${imageName}`
//       : `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${imageName}`,
//     dateLessThan: new Date(Date.now() + 1000 * 60 * 60).toString(), // 1 hour
//     privateKey: process.env.EAWS_CLOUDFRONT_PRIVATE_KEY as string,
//     keyPairId: process.env.EAWS_CLOUDFRONT_KEY_PAIR_ID as string,
//   });

//   return url;
// };

// export const invalidateCloudfront = async (path: string) => {
//   const params = {
//     DistributionId: process.env.EAWS_CLOUDFRONT_DISTRIBUTION_ID as string,
//     InvalidationBatch: {
//       CallerReference: new Date().toISOString(),
//       Paths: {
//         Quantity: 1,
//         Items: [path],
//       },
//     },
//   };
//   const command = new CreateInvalidationCommand(params);
//   await cloudfront.send(command);
// };
