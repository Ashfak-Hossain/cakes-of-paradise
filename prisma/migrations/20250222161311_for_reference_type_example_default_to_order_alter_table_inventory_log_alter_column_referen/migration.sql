-- AlterTable
ALTER TABLE "InventoryLog" ALTER COLUMN "reference_type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "payment_method" DROP DEFAULT;
