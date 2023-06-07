/*
  Warnings:

  - A unique constraint covering the columns `[p_quantuty]` on the table `cart_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cart_product_p_quantuty_key` ON `cart_product`(`p_quantuty`);
