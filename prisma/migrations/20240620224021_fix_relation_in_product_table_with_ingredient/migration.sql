-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_ingredient_id_fkey";

-- CreateTable
CREATE TABLE "product_ingredient" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "ingredient_id" UUID NOT NULL,

    CONSTRAINT "product_ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
