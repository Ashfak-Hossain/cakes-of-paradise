import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { putObjectToS3 } from '@/aws';
import { db } from '@/lib/db';
import { ProductSchemaType } from '@/schemas/product';
import { getProductsReturn } from '@/types/types';

export const getProducts = async (limit: number, page: number): Promise<getProductsReturn> => {
  try {
    const offset = (page - 1) * limit;

    const products = await db.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { product_id: 'asc' },
      include: { Picture: true },
    });

    const totalCount = await db.product.count();

    return { products, totalCount };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching products', error);
  }
};

interface CreateProductParams {
  productData: ProductSchemaType;
  photos?: File[];
}
export const createProduct = async ({ productData, photos }: CreateProductParams) => {
  try {
    let uploadedPhotoUrls: string[] = [];

    if (photos && photos.length > 0) {
      uploadedPhotoUrls = await putObjectToS3({ files: photos, path: 'products' });
    }

    const {
      product_name,
      description,
      price,
      cost_to_make,
      current_stock,
      is_available,
      category_id,
    } = productData;

    if (!category_id) {
      throw new AppError('Category ID is required', 400);
    }

    const product = await db.product.create({
      data: {
        product_name,
        description,
        price,
        cost_to_make: cost_to_make || 0,
        current_stock,
        is_available,
        category_id,
        Picture: {
          createMany: {
            data: uploadedPhotoUrls.map((url) => ({ url })),
          },
        },
      },
      include: {
        Picture: true,
      },
    });

    console.log('Product from api ====>>', product);

    return product;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching products', error);
  }
};

// ! This is the final version of the service file after implementing the S3 delete service
// // ... other imports
// import { deleteObjectFromS3 } from '@/aws/s3';

// export const createProduct = async ({ productData, photos }: CreateProductParams) => {
//   let uploadedPhotoUrls: string[] = [];
//   try {
//     if (photos && photos.length > 0) {
//       const { photoUrls, failedUploads } = await putObjectToS3({
//         files: photos,
//         path: 'products',
//       });
//       uploadedPhotoUrls = photoUrls;
//       if (failedUploads.length > 0) {
//         throw new AppError('Some files failed to upload.', 400);
//       }
//     }

//     // ... create product in DB
//     const product = await db.product.create({
//       //...
//     });
//     return product;
//   } catch (error: any) {
//     if (uploadedPhotoUrls.length > 0) {
//       // Delete successfully uploaded files
//       await Promise.all(
//         uploadedPhotoUrls.map(async (url) => {
//           await deleteObjectFromS3(url);
//         })
//       );
//     }
//     if (error instanceof AppError) throw error;
//     throw new DatabaseError('Error occurred while creating product', error);
//   }
// };
