/*
  Warnings:

  - A unique constraint covering the columns `[p_id]` on the table `cart_product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `cart_product_p_quantuty_key` ON `cart_product`;

-- CreateIndex
CREATE UNIQUE INDEX `cart_product_p_id_key` ON `cart_product`(`p_id`);
