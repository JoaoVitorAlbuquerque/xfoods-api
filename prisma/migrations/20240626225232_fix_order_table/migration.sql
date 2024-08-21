-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product_on_order" DROP CONSTRAINT "product_on_order_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "read" SET DEFAULT false;

-- AlterTable
ALTER TABLE "product_on_order" ALTER COLUMN "size" DROP DEFAULT,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_on_order" ADD CONSTRAINT "product_on_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
