-- DropForeignKey
ALTER TABLE "product_on_order" DROP CONSTRAINT "product_on_order_product_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "product_on_order" ADD CONSTRAINT "product_on_order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
