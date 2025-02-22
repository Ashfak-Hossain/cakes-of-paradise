/*
  Warnings:

  - Changed the type of `reference_type` on the `InventoryLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `payment_method` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'BKASH', 'NAGAD', 'ROCKET', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRMED', 'BAKING', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('PURCHASE', 'ORDER', 'ADJUSTMENT');

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_product_id_fkey";

-- AlterTable
ALTER TABLE "InventoryLog" DROP COLUMN "reference_type",
ADD COLUMN     "reference_type" "ReferenceType" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "custom_order_id" INTEGER,
ALTER COLUMN "product_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CustomOrder" (
    "custom_order_id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "occasion" TEXT,
    "flavor" TEXT,
    "size" TEXT,
    "icing" TEXT,
    "decorations" TEXT,
    "special_requests" TEXT,
    "delivery_date" TIMESTAMP(3),
    "delivery_address" TEXT,
    "delivery_time" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "price" DECIMAL(65,30),
    "notes" TEXT,

    CONSTRAINT "CustomOrder_pkey" PRIMARY KEY ("custom_order_id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "picture_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "custom_order_id" INTEGER,
    "product_id" INTEGER,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("picture_id")
);

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_custom_order_id_fkey" FOREIGN KEY ("custom_order_id") REFERENCES "CustomOrder"("custom_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_custom_order_id_fkey" FOREIGN KEY ("custom_order_id") REFERENCES "CustomOrder"("custom_order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- For reference_type (example: default to 'ORDER')
ALTER TABLE "InventoryLog" ALTER COLUMN "reference_type" SET DEFAULT 'ORDER';

-- For payment_method (example: default to 'CASH')
ALTER TABLE "Order" ALTER COLUMN "payment_method" SET DEFAULT 'CASH';