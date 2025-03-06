import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { AppError, DatabaseError } from '@/app/api/v1/error/errorHandler';
import { putObjectToS3 } from '@/aws';
import { getSignedCloudfrontUrl } from '@/aws/Cloudfront';
import { deleteObjectFromS3 } from '@/aws/S3';
import { db } from '@/lib/db';
import { ProductSchemaType } from '@/schemas/product';
import { CreateProductParams, getProductsReturn } from '@/types/types';

/**
 * Retrieves a paginated list of products from the database, including their cover images,
 * and generates signed CloudFront URLs for those images.
 *
 * @async
 * @function getProducts
 * @param {number} limit - The maximum number of products to retrieve per page.
 * @param {number} page - The page number to retrieve.
 * @returns {Promise<{ products: Product[], totalCount: number }>} - A promise that resolves to an object containing:
 * - `products`: An array of product objects, where each product includes its cover image with a signed CloudFront URL.
 * - `totalCount`: The total number of products in the database.
 * @throws {AppError} - Thrown for invalid input parameters (e.g., limit or page <= 0).
 * @throws {DatabaseError} - Thrown for errors during database operations.
 * @throws {Error} - Thrown for errors during CloudFront URL generation.
 *
 * @example
 * // Example usage:
 * async function fetchProducts(page: number, limit: number) {
 * try {
 * const { products, totalCount } = await getProducts(limit, page);
 * console.log('Products:', products);
 * console.log('Total Count:', totalCount);
 * } catch (error) {
 * console.error('Error fetching products:', error);
 * }
 * }
 *
 * fetchProducts(1, 10); // Fetch the first page with 10 products
 */
export const getProducts = async (limit: number, page: number): Promise<getProductsReturn> => {
  try {
    if (limit <= 0 || page <= 0) {
      throw new AppError('Invalid limit or page number', 400);
    }

    const offset = (page - 1) * limit;

    const products = await db.product.findMany({
      take: limit,
      skip: offset,
      orderBy: { product_id: 'asc' },
      include: { Picture: { where: { cover: true } } },
    });

    const totalCount = await db.product.count();

    // Construct Signed CloudFront URLs (Picture.url contains the S3 key)
    const productsWithSignedUrls = await Promise.all(
      products.map(async (product) => {
        const signedPictures = await Promise.all(
          product.Picture.map(async (picture) => {
            try {
              const signedUrl = await getSignedCloudfrontUrl(picture.url);
              return { ...picture, url: signedUrl };
            } catch (error) {
              console.error('Error generating signed URL for picture:', error);
              //  return a default URL or null
              return { ...picture, url: null };
            }
          })
        );
        return { ...product, Picture: signedPictures };
      })
    );

    return { products: productsWithSignedUrls, totalCount };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while fetching products', error);
  }
};

/**
 * Creates a new product with the given data and optional photos.
 *
 * @param {CreateProductParams} params - An object containing the product data and optional photos.
 * @param {ProductSchemaType} params.productData - The product data to create.
 * @param {File} [params.photos] - An optional array of Files (photos) to upload for the product.
 *
 * @returns {Promise<Product & { Picture: Picture}>} A promise that resolves to the created product object, including it's associated pictures keys.
 * @example {return example}
 * ```json
 *  {
 *  product_id: 11,
 *  product_name: 'Jar Cake',
 *  category_id: 2,
 *  description: 'Delicious jar cake with chocolate and nuts',
 *  price: 3,
 *  cost_to_make: 5,
 *  current_stock: 3,
 *  is_available: true,
 *  created_at: 2025-03-04T06:48:36.365Z,
 *  Picture: [
 *   {
 *      picture_id: 5,
 *      url: 'xyz/aHTnC-Qx66HPPdL_3Y9Y-pain.jpg',
 *      custom_order_id: null,
 *      product_id: 11
 *   },
 *  ]
 * }
 * ```
 *
 * @throws {AppError} If the category ID is missing or if any photo upload fails.
 * @throws {DatabaseError} If an error occurs during the database operation.
 *
 * @example
 * const productData = {
 *    product_name: 'Jar Cake',
 *    description: 'Delicious jar cake with chocolate and nuts',
 *    price: 200, // as Number then convert to Decimal
 *    cost_to_make: 100, // as Number then convert to Decimal
 *    current_stock: 80,
 *    is_available: true,
 *    category_id: 1,
 * };
 * const photos = [file1, file2]; // File objects
 *
 * const newProduct = await createProduct({ productData, photos });
 */
export const createProduct = async ({
  productData,
  photos,
}: CreateProductParams): Promise<ProductSchemaType> => {
  /**
   * An array to store the keys of the photos uploaded to S3.
   * @example ['products/xxx/photo1.jpg', 'xxx/products/photo2.jpg']
   */
  const uploadedPhotoKeys: string[] = [];

  try {
    const product = await db.$transaction(async (tx) => {
      //! Later will use sharp to resize images before uploading to S3 to reduce the size of the images and improve the performance of the application
      if (photos && photos.length > 0) {
        await Promise.all(
          photos.map(async (photo) => {
            const nanoId = nanoid();
            const key = `products/${nanoId}-${photo.name}`;
            const photoKey = await putObjectToS3({ file: photo, key });
            if (photoKey) {
              uploadedPhotoKeys.push(photoKey);
            } else {
              throw new AppError('Failed to upload photo', 500);
            }
          })
        );
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

      // Use the transaction object (tx) for database operations
      const product = await tx.product.create({
        data: {
          product_name,
          description,
          price: new Prisma.Decimal(price),
          cost_to_make: new Prisma.Decimal(cost_to_make || 0.0),
          current_stock,
          is_available,
          category_id,
          Picture: {
            createMany: {
              data: uploadedPhotoKeys.map((key) => ({ url: key })),
            },
          },
        },
        include: {
          Picture: true,
        },
      });

      return product;
    });

    return {
      ...product,
      price: Number(product.price),
      cost_to_make: Number(product.cost_to_make),
    };
  } catch (error: any) {
    // If any error occurs during the transaction, delete uploaded photos
    if (error instanceof AppError && error.statusCode >= 500) {
      await Promise.all(
        uploadedPhotoKeys.map(async (key) => {
          await deleteObjectFromS3(key);
        })
      );
    }

    if (error instanceof AppError) throw error;
    throw new DatabaseError('Error occurred while creating product', error);
  }
};
